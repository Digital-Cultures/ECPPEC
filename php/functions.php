<?php
/**
 * FUNCTIONS
 */

/**
 * @param array $rows from DB call
 * @return array $years with earliest and latest years in result set
 */
function getYearRange($rows){
	$earliest_year = 3000;
	$latest_year = 0;
	$years = array();

	foreach ($rows as $value) {
		$election_id = $value['election_id'];
		$test_year = (int) $value['election_year'];
		if($test_year < $earliest_year){
			$earliest_year = $test_year;
		}
		if($test_year > $latest_year) {
			$latest_year = $test_year;
		}
	}

	$years['earliest'] = $earliest_year;
	$years['latest'] = $latest_year;
	return $years;
}

/**
 *
 * @param array $array
 * @return same array with keys in all lowercase, as failsafe against user inconsistency
 */
function optimizer($array) {
	$optimized = array();
	foreach($array as $k => $v) {
		$optimized[strtolower($k)] = $v;
	}
	return $optimized;
}

/**
 * @param $election_id single election id
 * @return integer, distinct voters
 */
function voter_count($election_id) {
    global $conn;
    $sql = "SELECT count(distinct voter_id) n FROM votes WHERE election_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s',$election_id);
    $stmt->execute();
    $result = $stmt->get_result(); // get the mysqli result
    $n = $result->fetch_all(MYSQLI_ASSOC); // fetch the data
    return $n[0]['n'];
}

/**
 * @param string $constituency
 * @return string constituency in the form the database expects
 */

function get_constituency($constituency) {
    if(empty($constituency)) return;
    if(strstr($constituency,'newcastle')) {
        if(strstr($constituency,'lyme')) {
            $constituency = 'Newcastle-under-Lyme';
        } else $constituency = 'Newcastle-upon-Tyne';
    } elseif (strstr($constituency,'berwick')) {
        $constituency = 'Berwick-upon-Tweed';
    } elseif (strstr($constituency,'k§ingston')) {
        $constituency = 'Kingston-upon-Hull';
    }
    return $constituency;
}

/**
 *
 * @param string $election_id
 * @return array of election results (candidate and number of votes)
 */
function vote_count($election_id) {
	global $conn;
	$sql = "SELECT
	count(*) votes,
	(
		SELECT IF(ce.running_as IS NOT NULL, ce.running_as, c.candidate_name)
		FROM candidates c
		JOIN candidates_elections ce ON ce.candidate_id = c.candidate_id
		WHERE c.candidate_id = v.candidate_id AND ce.election_id = v.election_id
	) candidate
	FROM votes v
	WHERE v.election_id = ?
	GROUP BY candidate_id, election_id
	ORDER BY votes desc";
	$stmt = $conn->prepare($sql);
	$stmt->bind_param('s',$election_id);
	$stmt->execute();
	$result = $stmt->get_result(); // get the mysqli result
	return $result->fetch_all(MYSQLI_ASSOC); // fetch the data
}

function election_results($election_id) {
    global $conn;
    $sql = "SELECT ce.election_id, IF(ce.running_as IS NOT NULL, ce.running_as, c.candidate_name) candidate,
    ce.returned,
    IF(ce.overturned_by IS NOT NULL, ce.overturned_by, 'n/a') overturned_by,
    ce.seated FROM candidates_elections ce JOIN candidates c ON c.candidate_id = ce.candidate_id
    WHERE election_id = ? 
    ORDER BY seated DESC, candidate";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s',$election_id);
    $stmt->execute();
    $result = $stmt->get_result(); // get the mysqli result
    return $result->fetch_all(MYSQLI_ASSOC); // fetch the data
}

function get_elections_from_candidates($candidates) {
    global $conn;
    $array = explode(";",$candidates);
    $n = count($array);
    foreach($array as &$candidate) {
        $candidate = "%" . $candidate . "%";
    }

    //get the election_ids with candidates matching the request
    //if they give multiple names, return hits on ANY of them

    $sql = "SELECT DISTINCT ce.election_id FROM candidates_elections ce
	JOIN candidates c ON c.candidate_id = ce.candidate_id
	WHERE ";

    $new_array = array();
    for($i=0; $i<$n; $i++) {
        $new_array[] = "c.candidate_name LIKE ?";
    }
    $string = implode(" OR ",$new_array);

    $sql .= $string;
    $stmt  = $conn->prepare($sql); // prepare

    if($n) {
        $types = str_repeat('s', $n); //types
        $stmt->bind_param($types, ...$array); // bind array at once
    }
    $stmt->execute();
    $result = $stmt->get_result(); // get the mysqli result
    $rows = $result->fetch_all(MYSQLI_ASSOC); // fetch the data

    $ids = array();
    foreach($rows as $d) {
        $ids[] = $d['election_id'];
    }

    return $ids;
}

function get_elections_from_constituency($constituency) {
    global $conn;
    $constituency = get_constituency($constituency);
    $sql = "SELECT election_id, election_year, election_month, election_date, 
        by_election_general, contested, electorate_size_est, has_data 
        FROM elections WHERE constituency = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $constituency);
    $stmt->execute();
    $result = $stmt->get_result(); // get the mysqli result
    return $result->fetch_all(MYSQLI_ASSOC);
}

/**
 * @param $election_id
 * @return array of voter details and votes for a given election
 */
function get_votes($election_id) {
    global $conn;
    $votes = array();
    if(!$election_id) return $votes;
    $sql = "SELECT COUNT(DISTINCT vote_round) FROM votes WHERE election_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s',$election_id);
    $stmt->execute();
    $result = $stmt->get_result(); // get the mysqli result
    $data = $result->fetch_all();
    $n = $data[0][0];

    if(!$n) return $votes;
    for($i=0; $i<$n; $i++) {
        $vote_round = $i + 1;
        $index = "Voting round $vote_round of $n";
        $sql = "SELECT 
        vr.surname,
        vr.forename, 
        IF(length(vr.occupation),vr.occupation,'not available') occupation,
        IF(length(vr.location_sanitized),vr.location_sanitized,'not available') address,
	    (SELECT 
		    group_concat(
		    IF(ce.running_as IS NOT NULL, ce.running_as, c.candidate_name) 
		    SEPARATOR ', '
    	    )
    	FROM candidates c
    	JOIN candidates_elections ce ON ce.candidate_id = c.candidate_id
    	WHERE ce.election_id = ?
    	AND c.candidate_id IN (
    	    SELECT candidate_id FROM votes v 
    	    WHERE v.voter_id = vr.voter_id
    	    AND v.vote_round = $vote_round
    	    )
        ) 'voted for'
        FROM voters vr 
        WHERE voter_id IN (SELECT voter_id FROM votes WHERE rejected = 0 AND election_id = ?)
        ORDER BY vr.surname, vr.forename";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param('ss', $election_id, $election_id);
        $stmt->execute();
        $result = $stmt->get_result(); // get the mysqli result
        $votes[$index] = $result->fetch_all(MYSQLI_ASSOC); // fetch the data
    }
    return $votes;
}

function safe_json_encode($value){
	if (version_compare(PHP_VERSION, '5.4.0') >= 0) {
		$encoded = json_encode($value, JSON_PRETTY_PRINT);
	} else {
		$encoded = json_encode($value);
	}
	switch (json_last_error()) {
		case JSON_ERROR_NONE:
			return $encoded;
		case JSON_ERROR_DEPTH:
			return 'Maximum stack depth exceeded'; // or trigger_error() or throw new Exception()
		case JSON_ERROR_STATE_MISMATCH:
			return 'Underflow or the modes mismatch'; // or trigger_error() or throw new Exception()
		case JSON_ERROR_CTRL_CHAR:
			return 'Unexpected control character found';
		case JSON_ERROR_SYNTAX:
			return 'Syntax error, malformed JSON'; // or trigger_error() or throw new Exception()
		case JSON_ERROR_UTF8:
			$clean = utf8ize($value);
			return safe_json_encode($clean);
		default:
			return 'Unknown error'; // or trigger_error() or throw new Exception()
	}
}

function utf8ize($mixed) {
	if (is_array($mixed)) {
		foreach ($mixed as $key => $value) {
			$mixed[$key] = utf8ize($value);
		}
	} else if (is_string ($mixed)) {
		return utf8_encode($mixed);
	}
	return $mixed;
}

function debug($thingy) {
    print "<pre>";
    print_r($thingy);
    print "</pre>";
}

//try our best to accommodate various ways of indicating a month
/**
 * @param $month
 * @return false|string|void (on success return database-friendly month format)
 */
function get_month($month)
{
    if(!$month) return;
    $month = strtolower($month);
    $m = false;
    switch($month) {
        case "jan":
        case "january":
        case "1":
            $m = "Jan";
            break;
        case "feb":
        case "february":
        case "2":
            $m = "Feb";
            break;
        case "mar":
        case "march":
        case "3":
            $m = "Mar";
            break;
        case "apr":
        case "april":
        case "4":
            $m = "Apr";
            break;
        case "may":
        case "5":
            $m = "May";
            break;
        case "june":
        case "jun":
        case "6":
            $m = "June";
            break;
        case "july":
        case "jul":
        case "7":
            $m = "July";
            break;
        case "aug":
        case "august":
        case "8":
            $m = "Aug";
            break;
        case "september":
        case "sep":
        case "sept":
        case "9":
            $m = "Sept";
            break;
        case "october":
        case "oct":
        case "10":
            $m = "Oct";
            break;
        case "november":
        case "nov":
        case "11":
            $m = "Nov";
            break;
        case "december":
        case "dec":
        case "12":
            $m = "Dec";
            break;
    }
    return $m;
}

function get_election_id($constituency,$year,$month) {
    global $conn;

    $sql = "select election_id from elections where constituency = ? and election_year = ? and election_month = ?";
    $my = array();
    $my[] = get_constituency($constituency);
    $my[] = (int) $year;
    $my[] = get_month($month);
    $stmt  = $conn->prepare($sql); // prepare
    $stmt->bind_param('sss', ...$my); // bind array
    $stmt->execute();
    $result = $stmt->get_result(); // get the mysqli result
    $rows = $result->fetch_row(); // fetch the data
    return isset($rows[0]) ? $rows[0] : false;
}

function get_candidates_from_election_id($election_id) {
    global $conn;
    $candidates = array();
    $sql = "select c.candidate_name, c.short_name, ce.candidate_id, ce.seated from candidates_elections ce
join candidates c on c.candidate_id = ce.candidate_id where election_id = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s',$election_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $rows = $result->fetch_all(MYSQLI_ASSOC);

    foreach($rows as $r) {
        $candidates[$r['candidate_id']]['candidate_name'] = $r['candidate_name'];
        $candidates[$r['candidate_id']]['short_name'] = $r['short_name'];
        $candidates[$r['candidate_id']]['candidate_id'] = $r['candidate_id'];
        $candidates[$r['candidate_id']]['seated'] = $r['seated'];
    }
    return $candidates;
}

function get_pollbook_reconstruction($election_id) {
    global $conn;
    $conn->query('set sql_mode = ""');
    $data = array();
    $sql = "select group_concat(v.candidate_id separator ';') candidate_id, vr.suffix_std, v.election_id, 
       v.page, v.line, v.votes_id,
       v.rejected, v.reason_rejected, v.poll_date, vr.voter_id, vr.occupation_std, 
       vr.forename, vr.surname, vr.location_sanitized
    from votes v join voters vr on vr.voter_id = v.voter_id
    /*join voters_occupations vo on vo.voter_id = v.voter_id*/
    where v.election_id = ?
    group by vr.voter_id";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s',$election_id);
    $stmt->execute();
    $result = $stmt->get_result();
    return $result->fetch_all(MYSQLI_ASSOC);
}

function get_voter_occupation_distribution($election_id) {
    global $conn;

    $conn->query('set sql_mode = ""');

    //get voters and candidate_ids they voted for
    $sql = "select group_concat(v.candidate_id separator ';') candidate_id, vr.suffix_std, v.election_id, v.rejected, 
       v.poll_date, vr.voter_id, vr.occupation_std, vr.guild
    from votes v join voters vr on vr.voter_id = v.voter_id
    where v.election_id = \"$election_id\"
    group by vr.voter_id";

    $result = $conn->query($sql);
    $rows = $result->fetch_all(MYSQLI_ASSOC);

    //put voter_id as index so we can match occupation stuff easily below
    $voters = array();
    $voter_ids = array();
    foreach($rows as $d) {
        $voters[$d['voter_id']] = $d;
        $voter_ids[] = $d['voter_id'];
    }

    //get occupation categories
    $sql = "select vo.voter_id, vo.level1, vo.level2, o.level_name 
        from voters_occupations vo join occupations_map o on o.level_code = vo.level2
        where voter_id in ("
        .   implode(',',$voter_ids)
        .   ")";
    $result = $conn->query($sql);
    $data = $result->fetch_all(MYSQLI_ASSOC);

    //put voter_id as index to match with voters array
    $occs = array();
    foreach($data as $d) {
        $occs[$d['voter_id']][] = array(
            'level1' => $d['level1'],
            'level2' => $d['level2'],
            'level_name' => $d['level_name']
        );
    }

    //add occupation category data to voters array
    foreach($voters as $voter_id => &$v) {
        if(isset($occs[$voter_id])) {
           $v['occupation'] = $occs[$voter_id];
        } else {
           $v['occupation'] = array();
        }
    }

    //return with numerical index starting at zero so json can make an array
    return array_values($voters);
}

function get_candidates_from_voter($voter_id, $election_id) {
    global $conn;
    $sql = "SELECT c.candidate_name, c.short_name, v.candidate_id 
            FROM votes v JOIN candidates c on c.candidate_id = v.candidate_id
            WHERE v.voter_id = ? AND v.election_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ss',$voter_id,$election_id);
    $stmt->execute();
    $result = $stmt->get_result();
    return $result->fetch_all(MYSQLI_ASSOC);
}
function get_voter_occupation_stats($election_id) {
    global $conn;

    $sql = "select * from occupations_map where level_num = 2";
    $result = $conn->query($sql);
    $occ_list = $result->fetch_all(MYSQLI_ASSOC);
    $data = array();
    foreach($occ_list as $d) {
        $sql = "select count(*) n, rejected from votes 
    where election_id = ? and voter_id in (select voter_id 
    from voters_occupations where level2 = ?) group by rejected";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('ss',$election_id, $d['level_code']);
        $stmt->execute();
        $result = $stmt->get_result();
        if($result->num_rows)
        $data[$d['level_code']] = $result->fetch_all(MYSQLI_ASSOC);
    }
    debug($data);
}


//if election results are requested (via 'include_results' flag), get them
$acceptable_flags = array("1","Y","y","yes","true");

/**
 * 	note: we'll accept any of the 'acceptable flags' so as to reduce chances
 * 	for users to get frustrated by accidentally putting 'Y' instead of '1' or
 * 	whatever; we don't just check if 'include_results' is set
 * 	to *anything* because once they know it's a possible option they might set it
 * 	to 0 or false or no as a way of trying to exclude results, so we'll allow that
*/


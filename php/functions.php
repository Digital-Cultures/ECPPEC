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
//keys in $months are things people might try, values are what database uses

$months = array(
    "january" => "Jan",
    1 => "Jan",
    "february" => "Feb",
    2 => "Feb",
    "march" => "Mar",
    3 => "Mar",
    "april" => "Apr",
    4 => "Apr",
    5 => "May",
    "jun" => "June",
    6 => "June",
    "jul" => "July",
    7 => "July",
    "august" => "Aug",
    8 => "Aug",
    "september" => "Sept",
    "sep" => "Sept",
    9 => "Sept",
    "october" => "Oct",
    10 => "Oct",
    "november" => "Nov",
    11 => "Nov",
    "december" => "Dec",
    12 => "Dec"
);


//if election results are requested (via 'include_results' flag), get them
$acceptable_flags = array("1","Y","y","yes","true");

/**
 * 	note: we'll accept any of the 'acceptable flags' so as to reduce chances
 * 	for users to get frustrated by accidentally putting 'Y' instead of '1' or
 * 	whatever; we don't just check if 'include_results' is set
 * 	to *anything* because once they know it's a possible option they might set it
 * 	to 0 or false or no as a way of trying to exclude results, so we'll allow that
*/


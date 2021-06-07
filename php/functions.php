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
 *
 * @param string $election_id
 * @return array of election results (candidate and number of votes)
 */
function election_results($election_id) {
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

//if election results are requested (via 'include_results' flag), get them
$acceptable_flags = array("1","Y","y","yes","true");
/**
 * 	note: we'll accept any of the 'acceptable flags' so as to reduce chances
 * 	for users to get frustrated by accidentally putting 'Y' instead of '1' or
 * 	whatever; we don't just check if 'include_results' is set
 * 	to *anything* because once they know it's a possible option they might set it
 * 	to 0 or false or no as a way of trying to exclude results, so we'll allow that
*/


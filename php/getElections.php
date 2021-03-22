<?php
require_once('config.php');

$conn = new mysqli($servername, $username, $password, $dbname);

//initialize some variables
$sql = "SELECT * FROM elections ";
$optimized = array(); //will enforce lowercase keys for $_GET array
$options = array(); //for building WHERE clause, derived from optimized $_GET variables
$big_array = array(); //will contain all user parameters in order, for use in prepared query

//lowercase all keys, eliminate inconsistency headaches
if(is_array($_GET)) {
	$optimized = optimizer($_GET);
}

//cast all years as integers for safety

//single year requested?
if(isset($optimized['year'])) {
	$options[] = "election_year = '"
	.	(int) $optimized['year']
	.	"'";
} else { //either single year OR a range, can't be both
	if (isset($optimized["from_year"])) {
		$options[] = "election_year >= '"
		.	(int) $optimized["from_year"]
		.	"'";
	}
	
	if (isset($optimized["to_year"])) {
		$options[] = "election_year <= '"
		.	(int) $optimized["to_year"]
		.	"'";
	}
}

//here we begin to set things up for a prepared statement

if (isset($optimized["month"])) {
	$array = explode(";",$optimized['month']);
	$big_array = array_merge($big_array,$array);
	$options[] = "election_month IN ("
	.	str_repeat("?,",count($array)-1)
	.	"?)";
}

if (isset($optimized["constituency"])) {
	$array = explode(";",$optimized['constituency']);
	$big_array = array_merge($big_array,$array);
	$options[] = "constituency IN ("
	.	str_repeat("?,",count($array)-1)
	.	"?)";
}

if (isset($optimized["countyboroughuniv"])) {
	$array = explode(";",$optimized['countyboroughuniv']);
	$big_array = array_merge($big_array,$array);
	$options[] = "countyboroughuniv IN ("
	.	str_repeat("?,",count($array)-1)
	.	"?)";
}

if (isset($optimized["byelectiongeneral"])) {
	$array = explode(";",$optimized['byelectiongeneral']);
	$big_array = array_merge($big_array,$array);
	$options[] = "by_election_general IN ("
	.	str_repeat("?,",count($array)-1)
	.	"?)";
}

if (isset($optimized["contested"])) {
	$array = explode(";",$optimized['contested']);
	$big_array = array_merge($big_array,$array);
	$options[] = "contested IN ("
	.	str_repeat("?,",count($array)-1)
	.	"?)";
	}

if(count($options)) {
	$sql .= "WHERE "
	.	implode(" AND ",$options);
}

$stmt  = $conn->prepare($sql); // prepare
$n = count($big_array);
if($n) {
	$types = str_repeat('s', $n); //types
	$stmt->bind_param($types, ...$big_array); // bind array at once
}
$stmt->execute();
$result = $stmt->get_result(); // get the mysqli result
$rows = $result->fetch_all(MYSQLI_ASSOC); // fetch the data
$years = getYearRange($rows);

//if election results are requested (via 'include_results' flag), get them
$acceptable_flags = array("1","Y","y","yes","true"); 
/** 
 * 	note: we'll accept any of the 'acceptable flags' so as to reduce chances 
 * 	for users to get frustrated by accidentally putting 'Y' instead of '1' or 
 * 	whatever; we don't just check if 'include_results' is set 
 * 	to *anything* because once they know it's a possible option they might set it 
 * 	to 0 or false or no as a way of trying to exclude results, so we'll allow that
 */

if(isset($optimized['include_results']) && in_array($optimized['include_results'],$acceptable_flags)) {
	foreach($rows as &$row) {
		$results = election_results($row['election_id']);
		$row['results'] = count($results) ? $results : "information not available"; 
	}
}
 
$response = array(
	"num_results"=>count($rows),
	"earliest_year"=>$years['earliest'],
	"latest_year"=>$years['latest'],
	"elections"=>$rows
);
print json_encode($response);
$conn->close();

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
	(SELECT candidate_name FROM candidates c WHERE c.candidate_id = v.candidate_id) candidate
	FROM votes v
	WHERE election_id = ?
	GROUP BY candidate_id 
	ORDER BY votes desc";
	$stmt = $conn->prepare($sql);
	$stmt->bind_param('s',$election_id);
	$stmt->execute();
	$result = $stmt->get_result(); // get the mysqli result
	return $result->fetch_all(MYSQLI_ASSOC); // fetch the data
}
?>



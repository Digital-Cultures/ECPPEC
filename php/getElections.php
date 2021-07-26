<?php
require_once('config.php');
require_once('functions.php');

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

if(isset($optimized['general_election_id'])) {
	$array = explode(";",$optimized['general_election_id']);
	$big_array = array_merge($big_array,$array);
	$options[] = "general_election_id IN ("
		.	str_repeat("?,",count($array)-1)
		.	"?)";
}

if (isset($optimized["election_id"])) {
	$array = explode(";",$optimized['election_id']);
	$big_array = array_merge($big_array,$array);
	$options[] = "election_id IN ("
		.	str_repeat("?,",count($array)-1)
		.	"?)";
}


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

//full vote details?
if(isset($optimized['include_votes']) && in_array($optimized['include_votes'],$acceptable_flags)) {
	foreach($rows as &$row) {
		$votes = get_votes($row['election_id']);
		$row['votes'] = count($votes) ? $votes : "information not available";
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


?>



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
if (isset($optimized["from_year"]) && isset($optimized["to_year"])) {
	$options[] = "election_year >= "
	.	(int) $optimized["from_year"]
	.	" AND election_year <= "
	.	(int) $optimized["to_year"];
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
$types = str_repeat('s', count($big_array)); //types
$stmt->bind_param($types, ...$big_array); // bind array at once
$stmt->execute();
$result = $stmt->get_result(); // get the mysqli result
$rows = $result->fetch_all(MYSQLI_ASSOC); // fetch the data

$response = array(
	"num_results"=>sizeof($rows),
	"earliest_year"=>getEarliestYear($rows),
	"latest_year"=>getLatestYear($rows),
	"elections"=>$rows
);
print json_encode($response);
$conn->close();

function getEarliestYear($rows){
	$earliest_year = 3000;
	foreach ($rows as $key => $value) {
		//echo $value['Year']."<br>";
		if($value['election_year'] < $earliest_year){
			$earliest_year = $value['election_year'];

		}
	}
	return $earliest_year;
}
function getLatestYear($rows){
	$latest_year = 0;
	foreach ($rows as $key => $value) {
		//echo $value['Year']."<br>";
		if($value['election_year'] > $latest_year){
			$latest_year=$value['election_year'];

		}
	}
	return $latest_year;
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


?>



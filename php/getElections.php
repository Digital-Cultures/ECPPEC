<?php
require_once('config.php');
require_once('functions.php');

$conn = new mysqli($servername, $username, $password, $dbname);

//initialize some variables, add geo
$sql = 	"SELECT e.*, c.lat, c.lng
	 	FROM elections e 
	 	JOIN constituencies c 
		ON c.constituency_id = e.constituency_id ";

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
	$options[] = "e.election_year = '"
	.	(int) $optimized['year']
	.	"'";
} else { //either single year OR a range, can't be both
	if (isset($optimized["from_year"])) {
		$options[] = "e.election_year >= '"
		.	(int) $optimized["from_year"]
		.	"'";
	}
	
	if (isset($optimized["to_year"])) {
		$options[] = "e.election_year <= '"
		.	(int) $optimized["to_year"]
		.	"'";
	}
}

if(isset($optimized['general_election_id'])) {
	$array = explode(";",$optimized['general_election_id']);
	$big_array = array_merge($big_array,$array);
	$options[] = "e.general_election_id IN ("
		.	str_repeat("?,",count($array)-1)
		.	"?)";
}

if (isset($optimized["election_id"])) {
	$array = explode(";",$optimized['election_id']);
	$big_array = array_merge($big_array,$array);
	$options[] = "e.election_id IN ("
		.	str_repeat("?,",count($array)-1)
		.	"?)";
}


if (isset($optimized["month"])) {
	$array = explode(";",$optimized['month']);
	$big_array = array_merge($big_array,$array);
	$options[] = "e.election_month IN ("
	.	str_repeat("?,",count($array)-1)
	.	"?)";
}

if (isset($optimized["constituency"])) {
	$array = explode(";",$optimized['constituency']);
	$big_array = array_merge($big_array,$array);
	$options[] = "e.constituency IN ("
	.	str_repeat("?,",count($array)-1)
	.	"?)";
}

if (isset($optimized["countyboroughuniv"])) {
	$array = explode(";",$optimized['countyboroughuniv']);
	$big_array = array_merge($big_array,$array);
	$options[] = "e.countyboroughuniv IN ("
	.	str_repeat("?,",count($array)-1)
	.	"?)";
}

if (isset($optimized["byelectiongeneral"])) {
	$array = explode(";",$optimized['byelectiongeneral']);
	$big_array = array_merge($big_array,$array);
	$options[] = "e.by_election_general IN ("
	.	str_repeat("?,",count($array)-1)
	.	"?)";
}

if (isset($optimized["contested"])) {
	$array = explode(";",$optimized['contested']);
	$big_array = array_merge($big_array,$array);
	$options[] = "e.contested IN ("
	.	str_repeat("?,",count($array)-1)
	.	"?)";
	}

if(count($options)) {
	$sql .= "WHERE e.office = 'parliament' AND "
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

//always include number of distinct voters
foreach($rows as &$row) {
	$voter_count = voter_count($row['election_id']);
	$row['num_voters'] = $voter_count;
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



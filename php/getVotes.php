<?php
//mysqli_set_charset("utf8");
require_once('config.php');
require_once('functions.php');
error_reporting(E_ALL);
ini_set('display_errors', 1);
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error > 0) {
	echo "no db";
	die("Connection failed: " . $conn->connect_error);
}

//initialize some variables
$sql = "SELECT * FROM elections ";
$optimized = array(); //will enforce lowercase keys for $_GET array
$options = array(); //for building WHERE clause, derived from optimized $_GET variables
$big_array = array(); //will contain all user parameters in order, for use in prepared query

//lowercase all keys, eliminate inconsistency headaches
if(is_array($_GET)) {
	$optimized = optimizer($_GET);
}

if(isset($optimized["election_id"])) {
	$array = explode(";",$optimized['election_id']);
	$big_array = array_merge($big_array,$array);
	$options[] = "election_id IN ("
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

if(count($options)) {
	$sql .= " WHERE "
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

foreach($rows as &$row) {
	$votes = get_votes($row['election_id']);
	$row['votes'] = count($votes) ? $votes : "information not available";
}


$response = array(
	"num_results"=>count($rows),
	"earliest_year"=>$years['earliest'],
	"latest_year"=>$years['latest'],
	"elections"=>$rows
);
/*
print "<pre>";
print_r($response);
print "</pre>";
*/
//$safe_rows = json_decode();
print safe_json_encode( $response );//json_encode($);
$conn->close();


?>



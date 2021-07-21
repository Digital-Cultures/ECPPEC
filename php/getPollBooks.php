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
$sql = "SELECT p.* FROM poll_books p 
		LEFT JOIN elections e on e.pollbook_id = p.pollbook_id";
$optimized = array(); //will enforce lowercase keys for $_GET array
$options = array(); //for building WHERE clause, derived from optimized $_GET variables
$big_array = array(); //will contain all user parameters in order, for use in prepared query

//lowercase all keys, eliminate inconsistency headaches
if(is_array($_GET)) {
	$optimized = optimizer($_GET);
}

if (isset($optimized["bookcode"])  ){
	$array = explode(";",$optimized['bookcode']);
	$big_array = array_merge($big_array,$array);

	$options[] = "p.pollbook_id IN ("
	.	str_repeat("?,",count($array)-1)
	.	"?)";
}

if(isset($optimized["election_id"])) {
	$array = explode(";",$optimized['election_id']);
	$big_array = array_merge($big_array,$array);
	$options[] = "p.election_id IN ("
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

//do they want election results?
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

	"poll_books"=>$rows
);
//print_r($rows);
//$safe_rows = json_decode();
print safe_json_encode( $response );//json_encode($);
$conn->close();


?>



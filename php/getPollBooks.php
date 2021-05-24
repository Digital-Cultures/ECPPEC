<?php
//mysqli_set_charset("utf8");
require_once('config.php');
require_once('functions.php');

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error > 0) {
	echo "no db";
	die("Connection failed: " . $conn->connect_error);
}


//initialize some variables
$sql = "SELECT p.* FROM poll_books p 
		LEFT JOIN elections e on e.pollbook_id = p.pollBookCode";
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
	
	$options[] = "p.pollBookCode IN ("
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
		$results = election_results($row['ElectionCode']);
		$row['results'] = count($results) ? $results : "information not available";
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



<?php
mysqli_set_charset("utf8");
require_once('config.php');
//?from_year=1734&to_year=1760
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
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// // Check connection
if ($db->connect_error > 0) {
	echo "no db";
	die("Connection failed: " . $conn->connect_error);
}
//echo 'Connected successfully.';

// $year_range ="";

$sql = "SELECT * FROM POLL_BOOKS";

$is_first_filter = true;


if ( isset($_GET["BookCode"])  ){
//	echo sizeof(explode(";", $_GET["BookCode"] )  );

	$BookCode ="";

	if(sizeof(explode(";", $_GET["BookCode"] )  )>1){

		if($is_first_filter){
			$BookCode = " where ( PollBookCode = ";
			$is_first_filter = false;
		}
		else{
			$BookCode = " and ( PollBookCode = ";
		}
		
		$BookCode.="'".explode(";", $_GET["BookCode"] )[0]."'";

		foreach (explode(";", $_GET["BookCode"] )  as $key => $value) {
//			echo "looking for:. ".$value."<br>";
			$BookCode.=" or PollBookCode = '".$value."'";

		}
		$BookCode.=" ) ";
	}
	else{

		if($is_first_filter){
			$BookCode = " where PollBookCode = '".$_GET["BookCode"]."'";
			$is_first_filter = false;
			//echo "individual:";
		}
		else{
			$BookCode = " and PollBookCode = '".$_GET["BookCode"]."'";
		}

	}

	
	//echo $year_range."<br>";
	$sql .= $BookCode;

}


$result = $conn->query($sql);

$rows = array();
while($r = mysqli_fetch_assoc($result)) {
	// print_r ($r);
	// echo $r."<br>";
	$rows[] = $r;
	   // echo $r;
}
// print_r($rows);
$response = array(
	"num_results"=>sizeof($rows),

	"poll_books"=>$rows
);
//print_r($rows);
//$safe_rows = json_decode();
print safe_json_encode( $response );//json_encode($);
$conn->close();


?>



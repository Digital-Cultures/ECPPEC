<?php

require_once('config.php');
//?from_year=1734&to_year=1760

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
//	echo sizeof(explode(";", $_GET["month"] )  );

	$month ="";

	if(sizeof(explode(";", $_GET["month"] )  )>1){

		if($is_first_filter){
			$month = " where ( month = ";
			$is_first_filter = false;
		}
		else{
			$month = " and ( month = ";
		}
		
		$month.="'".explode(";", $_GET["month"] )[0]."'";

		foreach (explode(";", $_GET["month"] )  as $key => $value) {
//			echo "looking for:. ".$value."<br>";
			$month.=" or month = '".$value."'";

		}
		$month.=" ) ";
	}
	else{
		if($is_first_filter){
			$month = " where month = '".$_GET["month"]."'";
			$is_first_filter = false;
		}
		else{
			$month = " and month = '".$_GET["month"]."'";
		}

	}

	
	//echo $year_range."<br>";
	$sql .= $month;
}



$result = $conn->query($sql);
$rows = array();
while($r = mysqli_fetch_assoc($result)) {
	$rows[] = $r;
	   // echo $r;
}

$response = array(
	"num_results"=>sizeof($rows),
	"PollBooks"=>$rows
);

print json_encode($response);
$conn->close();


?>



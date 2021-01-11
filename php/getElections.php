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
// echo 'Connected successfully.';

// $year_range ="";

$sql = "SELECT * FROM ELECTIONS";

$is_first_filter = true;

if (isset($_GET["from_year"]) && isset($_GET["to_year"])  ){
	$year_range = " where year > ".$_GET["from_year"]." and "."year < ".$_GET["to_year"];
	//echo $year_range."<br>";
	$sql .= $year_range;
	$is_first_filter = false;
}
if ( isset($_GET["month"])  ){
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


if ( isset($_GET["Constituency"])  ){
//	echo sizeof(explode(";", $_GET["Constituency"] )  );

	$Constituency ="";

	if(sizeof(explode(";", $_GET["Constituency"] )  )>1){

		if($is_first_filter){
			$Constituency = " where ( Constituency = ";
			$is_first_filter = false;
		}
		else{
			$Constituency = " and ( Constituency = ";
		}
		
		$Constituency.="'".explode(";", $_GET["Constituency"] )[0]."'";

		foreach (explode(";", $_GET["Constituency"] )  as $key => $value) {
		//	echo "looking for:. ".$value."<br>";
			$Constituency.=" or Constituency = '".$value."'";

		}
		$Constituency.=" ) ";
	}
	else{
		if($is_first_filter){
			$Constituency = " where Constituency = '".$_GET["Constituency"]."'";
			$is_first_filter = false;
		}
		else{
			$Constituency = " and Constituency = '".$_GET["Constituency"]."'";
		}

	}

	
	//echo $year_range."<br>";
	$sql .= $Constituency;
}

if ( isset($_GET["CountyBoroughUniv"])  ){
//	echo sizeof(explode(";", $_GET["CountyBoroughUniv"] )  );

	$CountyBoroughUniv ="";

	if(sizeof(explode(";", $_GET["CountyBoroughUniv"] )  )>1){

		if($is_first_filter){
			$CountyBoroughUniv = " where ( CountyBoroughUniv = ";
			$is_first_filter = false;
		}
		else{
			$CountyBoroughUniv = " and ( CountyBoroughUniv = ";
		}
		
		$CountyBoroughUniv.="'".explode(";", $_GET["CountyBoroughUniv"] )[0]."'";

		foreach (explode(";", $_GET["CountyBoroughUniv"] )  as $key => $value) {
	//		echo "looking for:. ".$value."<br>";
			$CountyBoroughUniv.=" or CountyBoroughUniv = '".$value."'";

		}
		$CountyBoroughUniv.=" ) ";
	}
	else{
		if($is_first_filter){
			$CountyBoroughUniv = " where CountyBoroughUniv = '".$_GET["CountyBoroughUniv"]."'";
			$is_first_filter = false;
		}
		else{
			$CountyBoroughUniv = " and CountyBoroughUniv = '".$_GET["CountyBoroughUniv"]."'";
		}

	}

	
	//echo $year_range."<br>";
	$sql .= $CountyBoroughUniv;
}

if ( isset($_GET["ByElectionGeneral"])  ){
//	echo sizeof(explode(";", $_GET["ByElectionGeneral"] )  );

	$ByElectionGeneral ="";

	if(sizeof(explode(";", $_GET["ByElectionGeneral"] )  )>1){

		if($is_first_filter){
			$ByElectionGeneral = " where ( ByElectionGeneral = ";
			$is_first_filter = false;
		}
		else{
			$ByElectionGeneral = " and ( ByElectionGeneral = ";
		}
		
		$ByElectionGeneral.="'".explode(";", $_GET["ByElectionGeneral"] )[0]."'";

		foreach (explode(";", $_GET["ByElectionGeneral"] )  as $key => $value) {
			//echo "looking for:. ".$value."<br>";
			$ByElectionGeneral.=" or ByElectionGeneral = '".$value."'";

		}
		$ByElectionGeneral.=" ) ";
	}
	else{
		if($is_first_filter){
			$ByElectionGeneral = " where ByElectionGeneral = '".$_GET["ByElectionGeneral"]."'";
			$is_first_filter = false;
		}
		else{
			$ByElectionGeneral = " and ByElectionGeneral = '".$_GET["ByElectionGeneral"]."'";
		}

	}

	
	//echo $year_range."<br>";
	$sql .= $ByElectionGeneral;
}
if ( isset($_GET["Contested"])  ){
//	echo sizeof(explode(";", $_GET["Contested"] )  );

	$Contested ="";

	if(sizeof(explode(";", $_GET["Contested"] )  )>1){

		if($is_first_filter){
			$Contested = " where ( Contested = ";
			$is_first_filter = false;
		}
		else{
			$Contested = " and ( Contested = ";
		}
		
		$Contested.="'".explode(";", $_GET["Contested"] )[0]."'";

		foreach (explode(";", $_GET["Contested"] )  as $key => $value) {
		//	echo "looking for:. ".$value."<br>";
			$Contested.=" or Contested = '".$value."'";

		}
		$Contested.=" ) ";
	}
	else{
		if($is_first_filter){
			$Contested = " where Contested = '".$_GET["Contested"]."'";
			$is_first_filter = false;
		}
		else{
			$Contested = " and Contested = '".$_GET["Contested"]."'";
		}

	}

	
	//echo $year_range."<br>";
	$sql .= $Contested;
}

function getEarliestYear($rows){
	$earliest_year = 3000;
	foreach ($rows as $key => $value) {
		//echo $value['Year']."<br>";
		if($value['Year']<$earliest_year){
			$earliest_year=$value['Year']; 

		}
	}
	return $earliest_year;
}
function getLatestYear($rows){
	$latest_year = 0;
	foreach ($rows as $key => $value) {
		//echo $value['Year']."<br>";
		if($value['Year']>$latest_year){
			$latest_year=$value['Year']; 

		}
	}
	return $latest_year;
}

// echo $sql;
$result = $conn->query($sql);
$rows = array();
while($r = mysqli_fetch_assoc($result)) {
	$rows[] = $r;
	   // echo $r;
}

$response = array(
	"num_results"=>sizeof($rows),
	"earliest_year"=>getEarliestYear($rows),
	"latest_year"=>getLatestYear($rows),
	"elections"=>$rows
);
//print_r($result);
 print json_encode($response);
$conn->close();


?>



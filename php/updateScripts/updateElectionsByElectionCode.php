<?php
error_reporting(-1);
require_once('../config.php');
function db () {
	static $conn;
	global $servername, $username, $password, $dbname;
	$conn = new mysqli( $servername, $username, $password, $dbname);
	if ($conn->connect_error > 0) {
		echo "no db";
		die("Connection failed: " . $conn->connect_error);
	}
	else{

		// echo "connected".$servername." ". $username." ".$password." ".$dbname."<br>";
	}

	return $conn;
}

// // Check connection
function main(){

//let's check the API key exists first
	$conn = db();
	checkForAPIKey( $_GET['Key']);
	$_GET["Notes"] = mysqli_real_escape_string($conn, $_GET["Notes"]);
	$_GET["Constituency"] = mysqli_real_escape_string($conn, $_GET["Constituency"]);
	$_GET["Franchise"] = mysqli_real_escape_string($conn, $_GET["Franchise"]);
	$_GET["ByElectionCause"] = mysqli_real_escape_string($conn, $_GET["ByElectionCause"]);
	//$_GET["Notes"] = mysqli_real_escape_string($conn, $_GET["Notes"]);
// 
	//now if we have a valid query
	if (allFieldsSet()){


		///let's check if this election code exists
		$electionExists = checkForElectionCode($conn);

	// echo "election exists is ".$electionExists."<br>";

		$sql="";
		// //if we're amending an existing record
		if($electionExists){
			// echo "Exists<br>";
			if(isset($_GET["ForDeletion"]) ){
				// echo "deleting ".$_GET["ElectionCode"]."<br>";
				if($_GET["ForDeletion"]){
					$sql.="DELETE FROM ELECTIONS WHERE ElectionCode='".$_GET["ElectionCode"]."'";
				}
			}else{
				// echo "updating ".$_GET["ElectionCode"]."<br>";
				$sql .= "UPDATE ELECTIONS SET Year = '".$_GET["Year"]."'";
				$sql .=", Month = '".$_GET["Month"]."'";
				$sql .=", Constituency = '".$_GET["Constituency"]."'";
				$sql .=", CountyBoroughUniv = '".$_GET["CountyBoroughUniv"]."'";
				$sql .=", Franchise = '".$_GET["Franchise"]."'";
				$sql .=", ByElectionGeneral = '".$_GET["ByElectionGeneral"]."'";
				$sql .=", ByElectionCause = '".$_GET["ByElectionCause"]."'";
				$sql .=", Contested = '".$_GET["Contested"]."'";
				$sql .=", PollBookCode = '".$_GET["PollBookCode"]."'";
				$sql .=", Notes = '".$_GET["Notes"]."'";
				$sql .=", Latitude = '".$_GET["Latitude"]."'";
				$sql .=", Longitude = '".$_GET["Longitude"]."'";
				$sql .=" WHERE ElectionCode='".$_GET["ElectionCode"]."'";

				
			}

		}
		///if this is a brand new record
		else{
			//echo "inserting new record for ".$_GET["ElectionCode"]."<br>";
			$sql.="INSERT INTO ELECTIONS (Year, Month, ElectionCode, Constituency, CountyBoroughUniv, Franchise, ByElectionGeneral, ByElectionCause, Contested, Notes, Latitude, Longitude, PollBookCode)";

				$sql.=" VALUES ('".$_GET["Year"]."', '".$_GET["Month"]."', '".$_GET["ElectionCode"]."', '". $_GET["Constituency"]."', '".$_GET["CountyBoroughUniv"]."', '".$_GET["Franchise"]."', '".$_GET["ByElectionGeneral"]."', '".$_GET["ByElectionCause"]."', '".$_GET["Contested"]."', '".$_GET["Notes"]."', '".$_GET["Latitude"]."', '".$_GET["Longitude"]."', '".$_GET["PollBookCode"]."')";

			//	echo $sql."<br>";

		}

		//echo "sql".$sql."<br>";

		$result = $conn->query($sql);


		//$conn->close();
	}
}
//if there's no matching API key exit 
	function checkForAPIKey( $api_key){
		 
		$sql = "SELECT Name FROM API_KEYS where Secret =";
		// echo "checking api key".$sql;
//check API key exists
		if (isset($api_key) ){ 

			$sql.="'".$api_key."'";
			$conn = db();
	//echo $sql;
			$result = $conn->query($sql);
			$rows = array();
	//echo "len".sizeof($rows);
			while($r = mysqli_fetch_assoc($result)) {
				$rows[] = $r;
				//echo $r;
			}
	//print_r($rows);

			if($rows[0]['Name'] ){
			//	echo "found API key belonging to ".$rows[0]['Name'];
			}
			else{
				fwrite(STDERR, "An error occurred.\n");
		exit(1); // A response code other than 0 is a failure
	}

	}else{
		fwrite(STDERR, "An error occurred.\n");
		//echo "no api key";
		exit(1); // A response code other than 0 is a failure
	}


}
function checkForElectionCode(){
	$doesKeyExistQuery = "SELECT ElectionCode FROM ELECTIONS";
	$conn = db();
	$result = $conn->query($doesKeyExistQuery);
	$rows = array();
	$electionExists = false;
	while($r = mysqli_fetch_assoc($result)) {
		$rows[] = $r;
		//if(strlen($r["ElectionCode"])>4) echo $r["ElectionCode"]."<br>";
		if($_GET["ElectionCode"]==$r["ElectionCode"]) $electionExists = true;
	}
	return $electionExists;

}
function allFieldsSet(){
	if(isset($_GET["Year"]) && isset($_GET["Month"]) && isset($_GET["ElectionCode"]) && isset($_GET["Constituency"]) && isset($_GET["CountyBoroughUniv"]) && isset($_GET["ByElectionGeneral"]) &&  isset($_GET["Contested"]) &&  isset($_GET["Notes"]) && isset($_GET["Latitude"]) && isset($_GET["Longitude"]) && isset($_GET["PollBookCode"]) ){
		return true;
	}
	else{
		false;
	}
}
main();
$conn = db();
$conn->close();
?>



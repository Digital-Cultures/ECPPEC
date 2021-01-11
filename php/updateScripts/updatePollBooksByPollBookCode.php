<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
set_time_limit(0);

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
	checkForAPIKey($_GET['Key']);
	$_GET["Citation"] = mysqli_real_escape_string($conn, $_GET["Citation"]);
	$_GET["Holdings"] = mysqli_real_escape_string($conn, $_GET["Holdings"]);
	$_GET["Source"] = mysqli_real_escape_string($conn, $_GET["Source"]);
	$_GET["Notes"] = mysqli_real_escape_string($conn, $_GET["Notes"]);
	// $_GET["Citation"] = mysqli_real_escape_string($conn, $_GET["Citation"]);
// 
	
	//now if we have a valid query
	if (allFieldsSet()){
		
		///let's check if this election code exists
		$pollBookExists = checkForPollBookCode();



		$sql="";
		// //if we're amending an existing record
		if($pollBookExists){
			//echo $_GET["PollBookCode"]. " Exists<br>";
			if(isset($_GET["ForDeletion"]) && $_GET["ForDeletion"]=="Y"){
				// echo "deleting ".$_GET["ElectionCode"]."<br>";
				if($_GET["ForDeletion"]){
					$sql.="DELETE FROM POLL_BOOKS WHERE PollBookCode='".$_GET["PollBookCode"]."'";
				}
			}
			else{


			//	echo "updating ".$_GET["PollBookCode"]."<br>";
				$sql .= "UPDATE POLL_BOOKS SET PollBookCode = '".$_GET["PollBookCode"]."'";
				$sql .=", PrintMS = '".$_GET["PrintMS"]."'";
				$sql .=", Citation = '".$_GET["Citation"]."'";
				$sql .=", Holdings = '".$_GET["Holdings"]."'";
				$sql .=", Source = '".$_GET["Source"]."'";
				$sql .=", ElectionCode = '".$_GET["ElectionCode"]."'";
				$sql .=", Notes = '".$_GET["Notes"]."'";	
				$sql .=" where PollBookCode= '".$_GET["PollBookCode"]."'";			


			}
		}

		///if this is a brand new record
		else{
			// echo "<br>Record doesn't exist. Inserting new record for ".$_GET["PollBookCode"]."<br>";
			$sql.="INSERT INTO POLL_BOOKS (PollBookCode, PrintMS, Citation, Holdings, Source, ElectionCode, Notes)";

			$sql.=" VALUES ('".$_GET["PollBookCode"]."', '".$_GET["PrintMS"]."', '".$_GET["Citation"]."', '". $_GET["Holdings"]."', '".$_GET["Source"]."', '".$_GET["ElectionCode"]."', '".$_GET["Notes"]."');";

			// echo $sql."<br>";

		}

	//	echo "sql: " .$sql."<br>";
		

		//if(!$pollBookExists) 
		$result =  $conn->query($sql);
		// echo "Results ".$result."<br>";
		// print_r($result);
		// printf("Select returned %d rows.\n", $result->num_rows);


	}
}
//if there's no matching API key exit 
function checkForAPIKey($api_key){

	$sql = "SELECT Name FROM API_KEYS where Secret =";

//	echo "check API key exists";
	if (isset($api_key) ){ 

		$sql.="'".$api_key."'";
		$conn = db();

		$result =  $conn->query($sql);
		$rows = array();

		while($r = mysqli_fetch_assoc($result)) {
			$rows[] = $r;

		}


		if($rows[0]['Name'] ){
				//echo "found API key belonging to ".$rows[0]['Name']."<br>";
		}
		else{
			fwrite(STDERR, "An error occurred.\n");
		exit(1); // A response code other than 0 is a failure
	}
	//

	//$conn->close();
}else{
	fwrite(STDERR, "An error occurred.\n");
	echo "no matching api key<br>";
		exit(1); // A response code other than 0 is a failure
	}


}
function checkForPollBookCode(){
//	echo "<br>checking if ".$_GET["PollBookCode"]." exists <br>";
	$doesKeyExistQuery = "SELECT PollBookCode FROM POLL_BOOKS";
	$conn = db();
	$result =  $conn->query($doesKeyExistQuery);
	$rows = array();
	$pollBookExists =false;
	while($r = mysqli_fetch_assoc($result)) {
		// $pollBookExists = false;
		//$rows[] = $r;
		//if(strlen($r["PollBookCode"])>4) echo $r["PollBookCode"]."<br>";
		//echo "checking ".$_GET["PollBookCode"]." ".$r["PollBookCode"]."<br>";
		if($_GET["PollBookCode"]===$r["PollBookCode"]) {
			$pollBookExists = true;
		//	echo $_GET["PollBookCode"]." ".$r["PollBookCode"]." match is ".$pollBookExists."<br>";
			// return $pollBookExists;
			// break;
//			return true;//

			
		}
		
	}
	// $conn->close();
	return $pollBookExists;

}
function allFieldsSet(){
	//echo $_GET["PollBookCode"]." ".$_GET["PrintMS"]." ".$_GET["Citation"]." ".$_GET["Holdings"]." ".$_GET["Source"]." ".$_GET["Notes"];
	if(isset($_GET["PollBookCode"]) && isset($_GET["PrintMS"]) && isset($_GET["Citation"]) && isset($_GET["Holdings"]) && isset($_GET["Source"]) && isset($_GET["ElectionCode"]) &&  isset($_GET["Notes"])  ){

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



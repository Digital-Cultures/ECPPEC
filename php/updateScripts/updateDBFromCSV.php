<?php
//script requires get vars 'Key' and 'Table' where table is set to 'PollBooks' or 'Elections'

// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
set_time_limit(0);
$filename ="";
if($_GET['Table']=="Elections"){
	$filename .= 'elections.csv';
}
elseif ($_GET['Table']=="PollBooks") {
	$filename .= 'pollBooks.csv';
}
else{
	die("Couldn't find table") ;
}


function removeBomUtf8($s){
	if(substr($s,0,3)==chr(hexdec('EF')).chr(hexdec('BB')).chr(hexdec('BF'))){
		return substr($s,3);
	}else{
		return $s;
	}
}

function getCSVData($filename){
	$new_form_data = array(); 

	$is_first_row = TRUE;
	$column_names;
	$test = file_get_contents($filename);
	
// Open the file for reading
	if (($h = fopen("{$filename}", "r")) !== FALSE) 
	{

  // is 1000 characters the longest we can expect?
		while (($data = fgetcsv($h, 1000, ",")) !== FALSE) 
		{
			if($is_first_row){
				$column_names = $data;

				for ($i=0; $i <sizeof($column_names) ; $i++) { 
					$column_names[$i] = removeBomUtf8($column_names[$i]);
				}


				$is_first_row =FALSE;
			}
			else{
				$row = array();
				for ($i=0; $i <sizeof($data) ; $i++) { 
					//echo $column_names[$i]."<br>";
					$row[$column_names[$i]]=trim($data[$i]);
				}
				//this is just a dumb safety check to not insert empty rows. if it has now election code it's invalid anyway
				
				if($_GET['Table']=="Elections"){
					if(strlen($row['ElectionCode'])>2 ) array_push($new_form_data, $row);
				}
				elseif ($_GET['Table']=="PollBooks") {
					if(strlen($row['PollBookCode'])>2 ) array_push($new_form_data, $row);
				}
			}

		}
		fclose($h);
	}
	//print_r($new_form_data);
	return $new_form_data;
}

//not used. switched to GET
function post($url, $params){
	$ch = curl_init();

	curl_setopt($ch, CURLOPT_URL,$url);
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS,$params);

// Receive server response ...
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

	$server_output = curl_exec($ch);
	//print_r(curl_getinfo($ch));
	curl_close ($ch);

	//echo "server output".$server_output ."<br>";
	if ($server_output == "OK") {
		echo "success<br>";
	} else {
		echo $server_output."fail<br>";
	}
	

}
function get($url, $params){
	$ch = curl_init();
	//print_r($params);
	
	$url = $url  . http_build_query($params);
	//echo "$url".$url;
	curl_setopt($ch, CURLOPT_URL, $url);
	$server_output = curl_exec($ch);
	//print_r(curl_getinfo($ch));
	curl_close ($ch);

// Further processing ...
	//echo "server output".$server_output ."<br>";
	if ($server_output == "OK") {
	//	echo "success<br>";
	} else {
		echo $server_output."fail<br>";
	}
}

function contactAPI($new_form_data){
	//print_r($new_form_data);
	
	//make a separate API call for each line
	foreach ($new_form_data as $key => $value) {
		$url ="";
		if($_GET['Table']=="Elections"){
			$url .= "https://ecppec.ncl.ac.uk/php/updateScripts/updateElectionsByElectionCode.php?";
			echo "making new API call for ".$value['ElectionCode']."<br>";
		}
		elseif ($_GET['Table']=="PollBooks") {
			$url .= "https://ecppec.ncl.ac.uk/php/updateScripts/updatePollBooksByPollBookCode.php?";
			echo "making new API call for ".$value['PollBookCode']."<br>";
		}
		else{
			die("Couldn't find table") ;
		}
		
		//echo $url;
		$value['Key']=$_GET['Key'];

		get($url,$value);
	}
}

contactAPI(getCSVData($filename));
// Display the code in a readable format

?>
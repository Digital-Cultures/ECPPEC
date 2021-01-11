<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
include_once './scraper/HtmlWeb.php';
use simplehtmldom\HtmlWeb;
// // Start a cURL resource
// $ch = curl_init();
// // Set options for the cURL
// curl_setopt($ch, CURLOPT_URL, 'http://historyofparliamentonline.org'); // target
// // curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']); // provide a user-agent
// // curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); // follow any redirects
// // curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // return the result
// // Execute the cURL fetch
// $result = curl_exec($ch);
// // Close the resource
// curl_close($ch);
// // Output the results
// echo "from curl".$result;

echo "test".$_GET["constituency"];
// get DOM from URL or file
$doc = new HtmlWeb();

if (isset($_GET["constituency"]) ){


$base_url = 'http://historyofparliamentonline.org/volume/';
$date_range="";
echo $_GET["year"];
//
if((int)$_GET["year"] >= 1660 && (int)$_GET["year"] <1690){
	$base_url.='1660-1715/constituencies/';
	$date_range="1660-1690";
}
if((int)$_GET["year"] >= 1690 && (int)$_GET["year"] <1715){
	$base_url.='1690-1715/constituencies/';
	$date_range="1690-1715";
}
if((int)$_GET["year"] >= 1715 && (int)$_GET["year"] <1754){
	$base_url.='1715-1754/constituencies/';
		$date_range="1715-1754";

}
if((int)$_GET["year"] >= 1754 && (int)$_GET["year"] <1790){
	$base_url.='1754-1790/constituencies/';
			$date_range="1754-1790";

}
if((int) $_GET["year"] >= 1790 && (int)$_GET["year"] <1820){
	$base_url.='1790-1820/constituencies/';
				$date_range="1790-1820";

}
if((int)$_GET["year"] >= 1820 && (int)$_GET["year"] <1832){
		$base_url.='1820-1832/constituencies/';
						$date_range="1820-1832";


}

$html = $doc->load($base_url.$_GET["constituency"]);

$response = "";
foreach($html->find('#constitueny-body') as $e)
	$response.= $e->innertext;

$arr = array(
	"innerText" => $response,
	"date_range"=> $date_range,
	"url"=>$base_url.$_GET["constituency"],
	"constituency"=>$_GET["constituency"]
);

print json_encode($arr);

}
// //$html = $doc->load('https://www.historyofparliamentonline.org/volume/1715-1754/constituencies/york/');



// // find all td tags with attribute align="center"
// foreach($html->find('td[align=center]') as $e)
// 	echo $e->innertext . '<br>' . PHP_EOL;
// $doc = new HtmlWeb();
// $html = $doc->load('http://www.google.com/');

// // find all links
// foreach($html->find('a') as $e)
// 	echo $e->href . '<br>' . PHP_EOL;


// ?>



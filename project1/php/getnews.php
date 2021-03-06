<?php 


ini_set('display_errors', 'on');
error_reporting(E_ALL);

function getCountryInfo($countrySelected) {
    $url = 'http://api.geonames.org/countryInfoJSON?formatted=true&lang=en&country=' . $countrySelected . '&username=rehaan7&style=full';
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL, $url);
    $result=curl_exec($ch);
    curl_close($ch);
    $decode = json_decode($result, true);
    return $decode['geonames'];
}

$countrySelected = $_REQUEST['selectedCountry'];
$output['getCountryInfo'] = getCountryInfo($countrySelected);

function getNews($countrySelected) {
    $url = 'https://newsapi.org/v2/sources?language=en&country='.$countrySelected.'&apiKey=2f81db3bdcae4b0c9afa0693e99c199c';
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL, $url);
    $result=curl_exec($ch);
    curl_close($ch);
    $decode = json_decode($result, true);
    return $decode;
}

$countrySelected = $_REQUEST['selectedCountry'];
$output['news'] = getNews($countrySelected);


$output["status"]["code"] = "200";
$output["status"]["name"] = "ok";
$output["status"]["description"] = "success";
//$output['data'] = $decode['geonames'];



//Sending data back to javascript
header('Content-type: application/json; charset=UTF-8');
echo json_encode($output);
?>
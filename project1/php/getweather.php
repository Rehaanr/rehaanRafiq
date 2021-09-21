<?php 

ini_set('display_errors', 'on');
error_reporting(E_ALL);

function getWeather($countrySelected) {
    $url = '';
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL, $url);
    $result=curl_exec($ch);
    curl_close($ch);
    $decode = json_decode($result, true);
    return $decode['geonames'];
}


$output["status"]["code"] = "200";
$output["status"]["name"] = "ok";
$output["status"]["description"] = "success";
$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . "ms";




//Sending data back to javascript
header('Content-type: application/json; charset=UTF-8');
echo json_encode($output);
?>
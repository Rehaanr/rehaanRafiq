<?php 

ini_set('display_errors', 'on');
error_reporting(E_ALL);

// function geocoding($country){
//     $url = 'https://api.opencagedata.com/geocode/v1/json?q=' . $country .'&key=66f3d9d96a9442ada7018f438ee6a7b7';
//     $ch = curl_init();
//     curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
//     curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//     curl_setopt($ch, CURLOPT_URL, $url);
//     $result=curl_exec($ch);
//     curl_close($ch);
//     $decode = json_decode($result, true);
//     return $decode['results'][0]['geometry'];
// }

// Geocoding
// $country = $_REQUEST['selectedCountry'];
// $output['geocoding'] = geocoding($country);

function getCountryCode($lat, $lng) {
    $url = 'http://api.geonames.org/countryCodeJSON?formatted=true&lat='.$lat.'&lng='.$lng.'&username=rehaan7&style=full';
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL, $url);
    $result=curl_exec($ch);
    curl_close($ch);
    $decode = json_decode($result, true);
    return $decode;
}


$lat = $_REQUEST['lat'];
$lng = $_REQUEST['lng'];


$output['countryCode'] = getCountryCode($lat, $lng);

$output["status"]["code"] = "200";
$output["status"]["name"] = "ok";
$output["status"]["description"] = "success";




//Sending data back to javascript
header('Content-type: application/json; charset=UTF-8');
echo json_encode($output);
?>
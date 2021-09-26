<?php 

ini_set('display_errors', 'on');
error_reporting(E_ALL);

function geocoding($country){
    $url = 'https://api.opencagedata.com/geocode/v1/json?q=' . $country .'&key=66f3d9d96a9442ada7018f438ee6a7b7';
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL, $url);
    $result=curl_exec($ch);
    curl_close($ch);
    $decode = json_decode($result, true);
    return $decode['results'][0]['geometry'];
}


// Geocoding
$country = $_REQUEST['selectedCountry'];
$output['geocoding'] = geocoding($country);

function getMarkers($lngMin, $lngMax, $latMax, $latMin){
    $url = 'http://api.opentripmap.com/0.1/en/places/bbox?lon_min='.$lngMin.'&lat_min='.$latMin.'&lon_max='.$lngMax.'&lat_max='.$latMax.'&kinds=tourist_object&format=geojson&apikey=5ae2e3f221c38a28845f05b6383ace7f87ab0df54152e7a0f719ff8d';
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL, $url);
    $result=curl_exec($ch);
    curl_close($ch);
    $decode = json_decode($result, true);
    return $decode;
}
$lat = geocoding($_REQUEST['selectedCountry'])['lat'];
$lng = geocoding($_REQUEST['selectedCountry'])['lng'];

$lngMin = $lng;
$lngMax = $lng;
$latMax = $lat;
$latMin = $lat;

$output['getMarkers'] = getMarkers($lngMin, $lngMax, $latMax, $latMin);





// function getPoi($lat, $lng) {
//     $url = 'http://api.geonames.org/findNearbyPOIsOSMJSON?formatted=true&lat='.$lat.'&lng='.$lng.'&username=rehaan7&style=full';
//     $ch = curl_init();
//     curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
//     curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//     curl_setopt($ch, CURLOPT_URL, $url);
//     $result=curl_exec($ch);
//     curl_close($ch);
//     $decode = json_decode($result, true);
//     return $decode;
// }



// Poi 
// $currency = getCountryInfo($_REQUEST['selectedCountry'])[0]['currencyCode'];

// $lat = geocoding($_REQUEST['selectedCountry'])['lat'];
// $lng = geocoding($_REQUEST['selectedCountry'])['lng'];

// $output['poi'] = getPoi($lat,$lng);


$output["status"]["code"] = "200";
$output["status"]["name"] = "ok";
$output["status"]["description"] = "success";




//Sending data back to javascript
header('Content-type: application/json; charset=UTF-8');
echo json_encode($output);
?>
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
//Geocoding
$country = $_REQUEST['selectedCountry'];
$output['geocoding'] = geocoding($country);


function getImages($lat, $lng) {
    $url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=c441bd8c750c110a6cdf5c3cbf3816bc&lat='.$lat.'&lon='.$lng.'&format=json&nojsoncallback=1';
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


$output['images'] = getImages($lat, $lng);

$output["status"]["code"] = "200";
$output["status"]["name"] = "ok";
$output["status"]["description"] = "success";




//Sending data back to javascript
header('Content-type: application/json; charset=UTF-8');
echo json_encode($output);
?>
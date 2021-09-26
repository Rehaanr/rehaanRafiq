<?php 

ini_set('display_errors', 'on');
error_reporting(E_ALL);

function getWeather($city) {
    $url = 'http://api.openweathermap.org/data/2.5/weather?q='.$city.'&appid=e96c0a232f002e1ae6eba4777403e165&units=metric';
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL, $url);
    $result=curl_exec($ch);
    curl_close($ch);
    $decode = json_decode($result, true);
    $decode['main'];
    $decode['weather'];
    return $decode;
}

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
// Country Info
$countrySelected = $_REQUEST['selectedCountry'];
$output['getCountryInfo'] = getCountryInfo($countrySelected);

// Weather
$city = getCountryInfo($_REQUEST['selectedCountry'])[0]['capital'];
$output['getWeather'] = getWeather($city);



$output["status"]["code"] = "200";
$output["status"]["name"] = "ok";
$output["status"]["description"] = "success";




//Sending data back to javascript
header('Content-type: application/json; charset=UTF-8');
echo json_encode($output);
?>
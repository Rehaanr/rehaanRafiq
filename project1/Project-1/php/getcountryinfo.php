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

function wikipediaInfo($country){
   $url = 'http://api.geonames.org/wikipediaSearchJSON?formatted=true&q=' . urlencode($country) .'&maxRows=10&username=rehaan7&style=full';
   $ch = curl_init();
   curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
   curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
   curl_setopt($ch, CURLOPT_URL, $url);
   $result=curl_exec($ch);
   curl_close($ch);
   $decode = json_decode($result, true);
   return $decode['geonames'];

}

$country = $_REQUEST['selectedCountry'];
$ouput['wikipediaInfo'] = wikipediaInfo($country);

$output["status"]["code"] = "200";
$output["status"]["name"] = "ok";
$output["status"]["description"] = "success";
//$output['data'] = $decode['geonames'];



//Sending data back to javascript
header('Content-type: application/json; charset=UTF-8');
echo json_encode($output);
?>
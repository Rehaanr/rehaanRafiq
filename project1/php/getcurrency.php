<?php 


ini_set('display_errors', 'on');
error_reporting(E_ALL);

function getCurrency($currency) {
    $url = 'https://openexchangerates.org/api/latest.json?app_id=13f1e9d013ad49bdbec3eb91c97caa4b&base='.$currency.'';
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL, $url);
    $result=curl_exec($ch);
    curl_close($ch);
    $decode = json_decode($result, true);
    return $decode['rates'];
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

// Currency
$currency = getCountryInfo($_REQUEST['selectedCountry'])[0]['currencyCode'];
$output['getCurrency'] = getCurrency($currency);


// Country Info
$countrySelected = $_REQUEST['selectedCountry'];
$output['getCountryInfo'] = getCountryInfo($countrySelected);

$output["status"]["code"] = "200";
$output["status"]["name"] = "ok";
$output["status"]["description"] = "success";




//Sending data back to javascript
header('Content-type: application/json; charset=UTF-8');
echo json_encode($output);
?>
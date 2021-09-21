<?php 
ini_set('display_errors', 'on');
error_reporting(E_ALL);




// Getting Country Polygon

function getCountryPolygons($countrySelected){
$data_as_string = file_get_contents("../data/countryBorders.geo.json");
$data = json_decode($data_as_string, true);
    foreach($data['features'] as $country) {
        if ($country['properties']['iso_a2'] == $countrySelected) {
        return $country['geometry'];
        }
    }
}

/*function geocoding($country){
    $url = 'https://api.opencagedata.com/geocode/v1/json?q=' . $country .'&key=66f3d9d96a9442ada7018f438ee6a7b7';
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL, $url);
    $result=curl_exec($ch);
    curl_close($ch);
    $decode = json_decode($result, true);
    return $decode['results']['annotations']['geometry'];
}*/


$output["status"]["code"] = "200";
$output["status"]["name"] = "ok";
$output["status"]["description"] = "success";

// Country Polygons
$countrySelected = $_REQUEST['selectedCountry'];
$output["countryPolygons"] = getCountryPolygons($countrySelected);


//$country = $_REQUEST['country'];
//$output['geocoding'] = geocoding($country);



//Sending data back to javascript
header('Content-type: application/json; charset=UTF-8');
echo json_encode($output);



?>
<?php 
ini_set('display_errors', 'on');
error_reporting(E_ALL);




// Getting Country Polygon

function getCountryPolygons($countrySelected){
$data_as_string = file_get_contents("../data/countryBorders.geo.json");
$data = json_decode($data_as_string, true);
    foreach($data['features'] as $country) {
        if ($country['properties']['iso_a2'] == $countrySelected) {
        return $country['geometry']['type']['coordinates'];
        }
    }
}


$output["status"]["code"] = "200";
$output["status"]["name"] = "ok";
$output["status"]["description"] = "success";

// Country Polygons
$countrySelected = $_REQUEST['selectedCountry'];
$output["countryPolygons"] = getCountryPolygons($countrySelected);





//Sending data back to javascript
header('Content-type: application/json; charset=UTF-8');
echo json_encode($output);



?>
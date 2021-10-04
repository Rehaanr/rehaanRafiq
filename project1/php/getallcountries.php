<?php 

ini_set('display_errors', 'on');
error_reporting(E_ALL);

// Getting Country List
$data_as_string = file_get_contents("../data/countryBorders.geo.json");
$data = json_decode($data_as_string, true);

$countries = [];
for($country = 0; $country < count($data['features']); $country++) {
array_push($countries,
(object)['code' => $data['features'][$country]['properties']['iso_a2'], 'name' => $data['features'][$country]['properties']['name']]);
}

usort($countries, function($a, $b){
    return strcmp($a->name, $b->name);
});



$output["status"]["code"] = "200";
$output["status"]["name"] = "ok";
$output["status"]["description"] = "success";

//Country List
$output["countryList"] = $countries;



//Sending data back to javascript
header('Content-type: application/json; charset=UTF-8');
echo json_encode($output);
?>
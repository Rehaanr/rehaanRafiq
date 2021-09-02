<?php 

$country = $_POST['country'];

//Getting data 
$data_as_string = file_get_contents("../data/countryBorders.geo.json");

//Attaching data 
$data = json_decode($data_as_string, true);
$country_name = $data['name'];

// Looping 
for($country = 0; $country < $data['features']; $country++) {
    $countries = [];

    array_push($countries, $country['name']);
    array_push($countries, $country['iso_a2']);

}

$output["status"]["code"] = "200";
$output["status"]["name"] = "ok";
$output["status"]["description"] = "success";
$output["data"] = $countries_arr;




//Sending data back to javascript
header('Content-type: application/json; charset=UTF-8');
echo json_encode($output);










?>
<?php 

$country = $_POST['country'];

//Getting data 
$data_as_string = file_get_contents("../data/countryBorders.geo.json");

//Attaching data 
$data = json_decode($data_as_string, true);


// Looping 


for($country = 0; $country < $data['features']; $country++) {

Array_push($countries, (object)[‘$name’=> data[‘features’][loopIndex][‘actualKey’], ‘iso_code’]
}
$countries = [];


$output["status"]["code"] = "200";
$output["status"]["name"] = "ok";
$output["status"]["description"] = "success";
$output["data"] = $countries;




//Sending data back to javascript
header('Content-type: application/json; charset=UTF-8');
echo json_encode($output);
?>
<?php 

$country = $_POST['country'];

//Getting data 
$data = file_get_contents("data/countryBorders.geo.json");

//Attaching data 
$data = json_decode($data, true);
$country_name = $data['name'];








//Sending data back to javascript
header('Content-type: application/json; charset=UTF-8');
echo json_encode($data);










?>
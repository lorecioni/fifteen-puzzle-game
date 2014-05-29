<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');  
include("../../config.php");

$rand_id = rand(1, 9999);
$result = mysql_query("SELECT code FROM 15_challenge WHERE code='.$rand_id.'");

if($result != false){
	while (mysql_num_rows($result) == 1)
	{
  	$rand_id = rand(1, 999);
  	$result = mysql_query("SELECT code FROM 15_challenge WHERE code='.$rand_id.'");
	}
}
$num_length = strlen((string)$rand_id);

if($num_length == 1){
	echo '000'.$rand_id;
	}
elseif($num_length == 2) {
	echo '00'.$rand_id;
	}
elseif($num_length == 3) {
	echo '0'.$rand_id;
	}
else {
	echo $rand_id;
}
?>
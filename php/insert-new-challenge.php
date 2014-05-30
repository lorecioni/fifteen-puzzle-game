<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');  
include("../../config.php");

$rand_id = rand(1, 9999);
$result = mysql_query("SELECT code FROM 15_challenges WHERE code='".$rand_id."'");

if($result != false){
	while (mysql_num_rows($result) == 1)
	{
  	$rand_id = rand(1, 999);
  	$result = mysql_query("SELECT code FROM 15_challenges WHERE code='".$rand_id."'");
	}
}
$num_length = strlen((string)$rand_id);

if($num_length == 1){
	$rand_id = '000'.$rand_id;
	}
elseif($num_length == 2) {
	$rand_id = '00'.$rand_id;
	}
elseif($num_length == 3) {
	$rand_id = '0'.$rand_id;
	}
else {
	$rand_id = $rand_id;
}

echo $rand_id;

$sql = "INSERT INTO 15_challenges (code) VALUES ('".$rand_id."')";
$query = mysql_query($sql) or trigger_error(mysql_error());
?>
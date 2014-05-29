<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');  

include("../../config.php");

$code = $_GET['code'];

$sql = "INSERT INTO 15_challenges (code) VALUES (".$code.")" or trigger_error(mysql_error());
$query = mysql_query($sql);

if (mysql_affected_rows() == 1){
	echo 'success';
} else {
	echo 'failure';
}


?>
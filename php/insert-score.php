<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');  

include("../../config.php");

$name = $_GET['name'];
$moves = $_GET['moves'];
$time = '00:'.$_GET['time'];

list($hours,$mins,$secs) = explode(':',$time);
$seconds = mktime($hours,$mins,$secs) - mktime(0,0,0);

$score = $seconds + ($moves/2);

if($score < 0){
	$score = 0;
}

$sql = "INSERT INTO 15_scores (score, name, time, moves) VALUES (".$score.", '".$name."', '".substr($time, 3)."', ".$moves.")" or trigger_error(mysql_error());
$query = mysql_query($sql);

if (mysql_affected_rows() == 1){
	echo 'success';
} else {
	echo 'failure';
}


?>
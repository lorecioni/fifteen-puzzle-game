<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');  

include("../../config.php");

$name = $_GET['name'];
$moves = $_GET['moves'];
$time = '00:'.$_GET['time'];

$code = $_GET['code'];
$player = $_GET['player'];

list($hours,$mins,$secs) = explode(':',$time);
$seconds = mktime($hours,$mins,$secs) - mktime(0,0,0);

$score = $seconds + ($moves/2);

if($score < 0){
	$score = 0;
}

$sql = "UPDATE 15_challenges SET player".$player."_name = '".$name."', player".$player."_score = '".$score."', player".$player."_time = '".substr($time, 3)."', player".$player."_moves = ".$moves." WHERE code = '".$code."'";
$query = mysql_query($sql) or trigger_error(mysql_error());

if (mysql_affected_rows() == 1){
	echo 'success';
} else {
	echo 'failure';
}


?>
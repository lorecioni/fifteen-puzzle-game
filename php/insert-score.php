<?php

$name = $_GET['name'];
$moves = $_GET['moves'];
$time = $_GET['time'];

$time = $time.explode(':');
$seconds = ($time[0] * 60) + $time[1];

$score = 500 + $seconds - $moves;

if($score < 0){
	$score = 0;
}

$sql = "INSERT INTO 15_scores (score, name, time, moves) VALUES (".$score.", '".$name."', "'.$time.'", ".$moves.")";
$query = mysql_query($sql);

if (mysql_affected_rows() == 1){
	echo 'success';
} else {
	echo 'failure';
}
//echo 'moves '.$moves;
//echo 'name '.$name;
//echo 'seconds '.$seconds;

?>
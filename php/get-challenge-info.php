<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');  
include("../../config.php");

$code = $_GET['code'];

$query = "SELECT * FROM 15_challenges WHERE code = '".$code."'";
$result = mysql_query($query);

while($row = mysql_fetch_array($result)){
	echo '<div id="player-1">';
	echo '<div class="challenge-name">'.$row['player1_name']."</div>";
	echo '<div class="challenge-time">'.$row['player1_time']."</div>";
	echo '<div class="challenge-score">'.$row['player1_score']."</div>";
	echo '<div class="challenge-moves">'.$row['player1_moves']."</div>";
	echo '</div><div id="versus">VS</div><div id="player-2">';
	echo '<div class="challenge-name">'.$row['player2_name']."</div>";
	echo '<div class="challenge-time">'.$row['player2_time']."</div>";
	echo '<div class="challenge-score">'.$row['player2_score']."</div>";
	echo '<div class="challenge-moves">'.$row['player2_moves']."</div>";
	echo '</div>';
}

?>
<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');  
include("../../config.php");

$query = "SELECT * FROM 15_challenges ORDER BY id DESC LIMIT 5";
$result = mysql_query($query);

$count = 1;

echo '<ul id="last-challenges">';
while($row = mysql_fetch_array($result)){
   if($row['player1_score'] != 0 && $row['player2_score'] != 0){
	echo '<li><div class="player-1">';
	if($row['player1_score'] < $row['player2_score']){
		echo '<img src="img/medal.png" id="medal">';
	}
	echo '<div class="challenge-name">'.$row['player1_name']."</div>";
	echo '<div class="challenge-score">'.$row['player1_score']."</div>";
	echo '</div><div id="versus">VS</div><div class="player-2">';
	if($row['player1_score'] > $row['player2_score']){
		echo '<img src="img/medal.png" id="medal">';
	}
	echo '<div class="challenge-score">'.$row['player2_score']."</div>";
	echo '<div class="challenge-name">'.$row['player2_name']."</div>";
	echo '</div></li>';
   }
}


echo '</ul>';
?>
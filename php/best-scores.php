<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');  
include("../../config.php");

$query = "SELECT * FROM 15_scores ORDER BY score ASC LIMIT 5";
$result = mysql_query($query);

$count = 1;

while($row = mysql_fetch_array($result)){
	echo '<li>';
	if($count == 1){
		echo '<img src="img/crown.png" alt="crown">';
		echo '<span id="time-label">TIME</span>';
		echo '<span id="moves-label">MOVES</span>';
	}
	echo '<div class="position" title="Position">'.$count.'</div>';
	echo '<div class="name" title="Name">'.$row["name"].'</div>';
	echo '<div class="time" title="Time">'.$row["time"].'</div>';
	echo '<div class="moves" title="Moves">'.$row["moves"].'</div></li>';
	$count++;
}

?>
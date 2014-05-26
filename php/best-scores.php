<?php 

$query = "SELECT * FROM 15_scores ORDER BY score DESC LIMIT 5";
$result = mysql_query($query);

$count = 1;

while($row = mysql_fetch_array($result)){
	echo '<li>';
	if($count == 1){
		echo '<img src="img/crown.png" alt="crown">';
	}
	echo '<div class="position" title="Position">'.$count.'</div>';
	echo '<div class="name" title="Name">'.$row["name"].'</div>';
	echo '<div class="time" title="Time">'.$row["time"].'</div>';
	echo '<div class="moves" title="Moves">'.$row["moves"].'</div></li>';
	$count++;
}
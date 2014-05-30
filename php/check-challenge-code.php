<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');  
include("../../config.php");

$code = $_GET['code'];
$result = mysql_query("SELECT code FROM 15_challenges WHERE code='".$code."'");

if(mysql_num_rows($result) != 1){
  echo 'failure';
} else {
 echo 'success';
}

?>
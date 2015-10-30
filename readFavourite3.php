<?php

$fh = fopen("results.txt", "r") or die("Unable to open file!");

while (!feof($fh)){ 
         $dataArray[] = fgets($fh,9999); 
      } 
fclose($fh);

$selected = $dataArray[2];

echo json_encode($selected);

?>
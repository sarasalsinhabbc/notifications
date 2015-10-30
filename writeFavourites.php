<?php
	$result1 = $_POST['result1'];
	$result2 = $_POST['result2'];
	$result3 = $_POST['result3'];
	$result4 = $_POST['result4'];
	$result5 = $_POST['result5'];
	$result6 = $_POST['result6'];
	$result7 = $_POST['result7'];	

	$fh = fopen('results.txt', 'w');

	fwrite($fh, $result1 . "\n". $result2 . "\n". $result3 . "\n". $result4 . "\n". $result5 . "\n". $result6 . "\n". $result7 . PHP_EOL);
	fclose($fh);
?>
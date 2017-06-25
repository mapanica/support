
<?php
$from = "USD";
$currencies = array ("AUD", "CAD", "CHF", "CZK", "DKK", "EUR", "GBP", "HKD", "HUF", "JPY", "NOK", "NZD", "PLN", "SEK", "SGD", "USD");
//CONNECT to DB
include('../htdocs/process/db-connect.inc.php');
foreach ($currencies as $currency) {
	$ch = curl_init("http://download.finance.yahoo.com/d/quotes.csv?s=$from$currency=X&f=l1&e=.csv");
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_HEADER, false);
	curl_setopt($ch, CURLOPT_NOBODY, false);
	$rate = curl_exec($ch);
	curl_close($ch);
	$sql_replace= 'REPLACE INTO `currency_rates` (`currency`, `rate`) VALUES ("'.$currency.'","'.$rate.'")';
	// echo $sql_replace."\n";
	mysql_query($sql_replace, $_DB_H) OR die('FAIL UPDATING: '.$sql_replace);
}
?>

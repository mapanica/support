<?php
//CONNECT to DB
include('../htdocs/process/db-connect.inc.php');
function make_seed()
{
  list($usec, $sec) = explode(' ', microtime());
  return (float) $sec + ((float) $usec * 100000);
}
mt_srand(make_seed());
$sql_query_comments = "SELECT * FROM `donations` WHERE `processed` = 1 ORDER BY timestamp desc";
$sql_result = mysql_query($sql_query_comments, $_DB_H) OR die('FAIL UPDATING: '.$sql_query_comments);
$fp = fopen('../htdocs/campaign/donors.csv', 'w');
$count=0;
$headers = ['name','amount','currency','amount_usd','message','premium'];
// fputcsv($fp, array('name','amount','currency','amount_usd','message','premium')) OR die('FAILED writing header.');
fputcsv($fp, $headers) OR die('FAILED writing header.');
if ($sql_result AND mysql_num_rows($sql_result)>0) {
  while($contrib = mysql_fetch_array($sql_result ,MYSQL_ASSOC)) {
    $count++;
    $name = $contrib['anonymous'] ? 'Anonymous' : $contrib['name'];
    // CSV looks like this:
    // name:str, amount:float, currency:str, amount_usd:float, message:str, premium:bool
    fputcsv($fp, array($name, $contrib['amount'], $contrib['currency'], $contrib['amount_usd'], $contrib['comment'], '')) OR die('FAILED writing row');
  }
}
fclose($fp);
?>

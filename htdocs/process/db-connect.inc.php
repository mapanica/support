<?php

# connect to db
$_DB_H = mysql_connect('localhost','mapanica','RkN8wRofKsPMhVEy0g/uJoEDb7mDc0k');
mysql_select_db('mapanica_funding', $_DB_H);
mysql_query('SET NAMES \'utf8\'', $_DB_H);


# when running testing locally
// $_DB_H = mysql_connect('localhost:8888','root','root') or die("Unable to connect");
// mysql_select_db('hot_donate', $_DB_H) or die("Unable to reach db");
// mysql_query('SET NAMES \'utf8\'', $_DB_H);

# to test the db connection
// $showtablequery = "SHOW TABLES FROM hot_donate";
// $query_result = mysql_query($showtablequery);
// while($showtablerow = mysql_fetch_array($query_result))
// {
// echo $showtablerow[0]." ";
// }

?>

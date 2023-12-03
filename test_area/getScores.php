<?php

include "./config/database.php";

$fin_games = "";

$sql = 'SELECT * FROM tblgames WHERE state="fin";';

$query = mysqli_query($conn, $sql);

if ($query) {
    $d_fingames = mysqli_fetch_all($query, MYSQLI_ASSOC);
    if (!empty($d_fingames)) {
        $fin_games = $d_fingames;
        print_r($fin_games);
    }
}

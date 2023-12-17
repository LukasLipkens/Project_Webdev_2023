<?php
    include_once '../config/database.php';

    session_start();

    $gameId = $_GET['gameId'];
    $teamId = $_GET['teamId'];
    $spelerId = $_GET['spelerId'];

    $sql = "INSERT INTO tblteamspeler (gameId, teamId, spelerId)
    VALUES ($gameId, $teamId, $spelerId);";

    $insert = $conn->query($sql);

    //echo $insert;

    //dit is om ervoor te zorgen dat de ajax call in myGamesPage.js de data terug krijgt
    echo json_encode("hello");
<?php
    include_once '../config/database.php';

    session_start();

    $gameId = $_GET['gameId'];
    $teamId = $_GET['teamId'];
    $spelerId = $_GET['spelerId'];

    $sql = "INSERT INTO tblteamspeler (gameId, teamId, spelerId)
    VALUES ($gameId, $teamId, $spelerId);";

    $insert = $conn->query($sql);

    echo $insert;
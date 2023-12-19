<?php
    include_once '../config/database.php';

    session_start();

    $gameId = $_GET['gameId'];
    $gamesT1 = $_GET['gamesT1'];
    $gamesT2 = $_GET['gamesT2'];
    $setNr = $_GET['setNr'];

    $sql = "INSERT INTO tblsets (gameId, setNr, gamesT1, gamesT2)
    VALUES ($gameId, $setNr, $gamesT1, $gamesT2);";

    $insert = $conn->query($sql);

    echo json_encode("succes");
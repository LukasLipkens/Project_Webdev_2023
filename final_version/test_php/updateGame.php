<?php
    include_once '../config/database.php';

    session_start();

    $gameId = $_GET['gameId'];
    $puntenT1 = $_GET['puntenT1'];
    $puntenT2 = $_GET['puntenT2'];
    $setT1 = $_GET['setsT1'];
    $setT2 = $_GET['setsT2'];
    $gamesT1 = $_GET['gamesT1'];
    $gamesT2 = $_GET['gamesT2'];
    $serving = $_GET['serving'];


    $sql = "UPDATE tblteam
    SET punten = $puntenT1,sets = $setT1, games = $gamesT1
    WHERE gameId = $gameId AND teamId = 1;";

    $insert = $conn->query($sql);

    $sql = "UPDATE tblteam
    SET punten = $puntenT2,sets = $setT2, games = $gamesT2
    WHERE gameId = $gameId AND teamId = 2;";

    $insert = $conn->query($sql);

    $sql = "UPDATE tblgames
    SET serving = $serving
    WHERE gameId = $gameId;";

    $insert = $conn->query($sql);

    echo json_encode("succes");
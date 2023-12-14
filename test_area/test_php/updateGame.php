<?php
    include_once '../config/database.php';

    session_start();

    $gameId = $_GET['gameId'];
    $puntenT1 = $_GET['puntenT1'];
    $puntenT2 = $_GET['puntenT2'];
    $setT1 = $_GET['setT1'];
    $setT2 = $_GET['setT2'];
    $gamesT1 = $_GET['gamesT1'];
    $gamesT2 = $_GET['gamesT2'];
    $serving = $_GET['serving'];


    $sql = "UPDATE tblgames
    SET puntenT1 = $puntenT1, puntenT2 = $puntenT2, setT1 = $setT1, setT2 = $setT2, gamesT1 = $gamesT1, gamesT2 = $gamesT2, serving = $serving
    WHERE gameId = $gameId;";
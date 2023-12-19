<?php

    include_once '../config/database.php';

    session_start();

    $sql = "INSERT INTO tblgames (starttijd, date, state, serving)
    VALUES (NOW(), CURDATE(), 'on', 1);";

    $insert = $conn->query($sql);

    // Get the ID of the last inserted row
    $gameId = $conn->insert_id;

    //$_SESSION['gameId'] = $gameId;
    $_SESSION['setNr'] = 1;

    echo $gameId;

    $sql = "INSERT INTO tblteam (gameId, teamId, punten, games, sets)
    VALUES ($gameId, 1, 0, 0, 0),
           ($gameId, 2, 0, 0, 0);";

    $insert = $conn->query($sql);
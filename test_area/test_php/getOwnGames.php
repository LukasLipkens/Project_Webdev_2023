<?php

    include_once '../config/database.php';

    session_start();

    //$session_id = $_SESSION['id'];

    $session_id = 1;

    $sql = "SELECT 
    g.gameId,
    GROUP_CONCAT(IF(t.teamId = 1, s.gebruikersnaam, NULL)) AS 'team1 names',
    GROUP_CONCAT(IF(t.teamId = 2, s.gebruikersnaam, NULL)) AS 'team2 names',
    MAX(IF(t.teamId = 1, t.punten, NULL)) AS 'team1 punten',
    MAX(IF(t.teamId = 2, t.punten, NULL)) AS 'team2 punten',
    MAX(IF(t.teamId = 1, t.games, NULL)) AS 'team1 games',
    MAX(IF(t.teamId = 2, t.games, NULL)) AS 'team2 games',
    MAX(IF(t.teamId = 1, t.sets, NULL)) AS 'team1 sets',
    MAX(IF(t.teamId = 2, t.sets, NULL)) AS 'team2 sets',
    serving
  FROM 
    tblgames g
  JOIN 
    tblteam t ON g.gameId = t.gameId
  JOIN 
    tblteamspeler ts ON t.gameId = ts.gameId AND t.teamId = ts.teamId
  JOIN 
    tblspelers s ON ts.spelerId = s.id
    WHERE g.state = 'fin' AND s.id = ".$session_id."
  GROUP BY 
    g.gameId;";

    $result = $conn->query($sql);

    $own_games = mysqli_fetch_all($result, MYSQLI_ASSOC);

    
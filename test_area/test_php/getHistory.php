<?php
    include_once '../config/database.php';

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
  WHERE
    g.state = 'fin'
  GROUP BY 
    g.gameId;";

    $result = $conn->query($sql);
    $history = mysqli_fetch_all($result, MYSQLI_ASSOC);

    //here we add an extra array for the points
  

    $games = array();


    foreach($history as $game){
      $gameId = $game['gameId'];
      $fullgame = array_merge($game, array('game' => $game));

      $sql = "SELECT ts.teamId, s.setNr, s.gamesT1, s.gamesT2
      FROM tblgames g
      JOIN tblteamspeler ts ON g.gameId = ts.gameId
      JOIN tblspelers p ON ts.spelerId = p.id
      JOIN tblSets s ON g.gameId = s.gameId
      WHERE s.gameId=".$gameId."
      ORDER BY s.setNr;";
    
      $result = $conn->query($sql);
      $points = mysqli_fetch_all($result, MYSQLI_ASSOC);
      $fullgame = array_merge($fullgame, array('points' => $points));

      $games[] = $fullgame;
    }
    //print_r(json_encode($history));
    print_r(json_encode($games));
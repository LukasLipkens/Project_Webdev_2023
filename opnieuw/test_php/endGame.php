<?php
    include_once '../config/database.php';

    session_start();

    $gameId = $_GET['gameId'];
    

    $sql = "UPDATE tblgames SET state = 'fin' WHERE gameId = $gameId;";

    $insert = $conn->query($sql);

    echo json_encode("succes");
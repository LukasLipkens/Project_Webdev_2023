<?php
    include_once '../config/database.php';

    session_start();

    $search = $_GET['search'];

    $sql = "SELECT id, gebruikersnaam FROM tblspelers WHERE gebruikersnaam LIKE '%$search%';";
    $result = $conn->query($sql);

    $person = mysqli_fetch_all($result, MYSQLI_ASSOC);

    print_r(json_encode($person));
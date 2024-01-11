<?php
include_once("../config/database.php");

$name = $_GET["name"];
$email = $_GET["email"];
$password = $_GET["password"];

$error = "";

if (CheckExistingUser($email, $conn)) {
    $t_sql = 'INSERT INTO tblspelers (gebruikersnaam, password, email) VALUES("' . $name . '", "' . $password . '", "' . $email . '");';

    $t_add = mysqli_query($conn, $t_sql);

    if ($t_add) {
        echo $error;
    } else {
        $error = 'Error:' . mysqli_error($conn);
        echo $error;
    }
} else {
    $error ="user already exists:" . CheckExistingUser($email, $conn);
    echo $error;
}

function CheckExistingUser($email,  $conn)
{
    $t_sql = 'SELECT * FROM tblspelers WHERE email="' . $email . '";';

    $t_result = mysqli_query($conn, $t_sql);

    if ($t_result) {
        $t_arr = mysqli_fetch_all($t_result, MYSQLI_ASSOC);
        if (empty($t_arr)) {
            return 1;
        } else {
            return 0;
        }
    } else {
        return mysqli_error($conn);
    }
}

<?php
include "./config/database.php";

// $name = $_GET["name"];
// $email = $_GET["email"];
// $password = $_GET["password"];

$name = $_GET["name"];
$email = $_GET["email"];
$password = $_GET["password"];


if ($checkExistingUser($email) == 1) {
    $t_sql = 'INSERT INTO tblspelers (gebruikersnaam, password, email) VALUES("' . $name . '", "' . $password . '", "' . $email . '");';

    $t_add = mysqli_query($conn, $t_sql);

    if ($t_add) {
        echo 'succes';
    } else {
        echo 'Error:' . mysqli_error($conn);
    }
} else {
    var_dump("user already exists:" . $checkExistingUser);
}

$checkExistingUser = function () {
    global $conn;
    global $email;
    $t_sql = 'SELECT * FROM tblspelers WHERE email="' . $email . '";';

    $t_result = mysqli_query($conn, $t_sql);

    if ($t_result) {
        $t_arr = mysqli_fetch_all($t_result, MYSQLI_ASSOC);
        if (empty($t_arr[0])) {
            return 1;
        } else {
            return $t_arr;
        }
    } else {
        return mysqli_error($conn);
    }
};

<?php
//include "./config/database.php";
define('DB_HOST', 'localhost');
define('DB_USER', 'super');
define('DB_PASS', 'Project_Webdev');
define('DB_NAME', 'project_tennis');

// Create connection

$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Check connection

if ($conn->connect_error) {
    die("Connection failed $conn->connect_error");
}

$name = $_GET["name"];
$email = $_GET["email"];
$password = $_GET["password"];



if (CheckExistingUser($email, $conn)) {
    $t_sql = 'INSERT INTO tblspelers (gebruikersnaam, password, email) VALUES("' . $name . '", "' . $password . '", "' . $email . '");';

    $t_add = mysqli_query($conn, $t_sql);

    if ($t_add) {
        echo 'succes';
    } else {
        echo 'Error:' . mysqli_error($conn);
    }
} else {
    var_dump("user already exists:" . CheckExistingUser($email, $conn));
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

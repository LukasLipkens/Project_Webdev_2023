<?php
define('DB_HOST', 'localhost');
define('DB_USER', 'super');
define('DB_PASS', 'Project_Webdev');
define('DB_NAME', 'project_tennis');

// Create connection

$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Check connection

if ($conn->connect_error) {
    die("Connection failed $conn->connect_error");
    echo ("Connectie mislukt");
}
session_start();

$modus = $_GET["modus"];

if ($modus == 0 && isset($_SESSION["user"])) {
    print_r(true);
} else {
    $email = $_GET["email"];
    $password = $_GET["password"];
    $nameErr = $passErr = "";


    $t_sql = 'SELECT * FROM tblspelers WHERE email= "' . $email . '" AND password ="' . $password . '";';
    $t_result = mysqli_query($conn, $t_sql);
    if ($t_result) {
        $t_arr = mysqli_fetch_all($t_result, MYSQLI_ASSOC);
        if (empty($t_arr)) {
            echo "Error: user not found or password not correct";
        } else {
            $_SESSION['user'] = $t_arr[0];
            // var_dump($t_arr);
            var_dump($_SESSION["user"]);
            // echo "succes";
        }
    } else {
        echo "Error:" . mysqli_error($conn);
    }
}

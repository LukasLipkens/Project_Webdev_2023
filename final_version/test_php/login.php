<?php
define('DB_HOST', 'localhost');
define('DB_USER', 'Brad');
define('DB_PASS', 'eloict');
define('DB_NAME', 'project_tennis');

// Create connection

$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Check connection

if ($conn->connect_error) {
    die("Connection failed $conn->connect_error");
    echo ("Connectie mislukt");
}
session_start();

//$modus = $_GET["modus"];

$email = $_GET["email"];
$password = $_GET["password"];
$nameErr = $passErr = "";


$t_sql = 'SELECT * FROM tblspelers WHERE email="' . $email . '" AND password="' . $password . '";';
$t_result = mysqli_query($conn, $t_sql);
if ($t_result) {
    $t_arr = mysqli_fetch_all($t_result, MYSQLI_ASSOC);
    if (empty($t_arr)) {
        //echo "Error: user not found or password not correct";
        echo json_encode("error");
    } else {
        $_SESSION['user'] = json_encode($t_arr[0]);
        // var_dump($t_arr);
        echo json_encode($_SESSION["user"]);
        // echo "succes";
    }
} else {
    //echo "Error:" . mysqli_error($conn);
    echo json_encode("error");
}

<?php
include "./config/database.php";

// $name = $_GET["name"];
// $email = $_GET["email"];
// $password = $_GET["password"];

$name = "Fred";
$email = "Fred@gmailcom";
$password = "elo";

// $t_sql = 'SELECT * FROM tblspelers WHERE email="niels@gmail.com" AND password="elo";';
// $t_result = mysqli_query($conn, $t_sql);
// if ($t_result) {
//     $t_arr = mysqli_fetch_all($t_result, MYSQLI_ASSOC);
//     if (empty($t_arr)) {
//         echo "Error: user not found or password not correct";
//     } else {
//         $_SESSION['user'] = $t_arr[0];
//         // var_dump($t_arr);
//         var_dump($_SESSION["user"]);
//         // echo "succes";
//     }
// } else {
//     echo "Error:" . mysqli_error($conn);
// }
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

function CheckExistingUser($email)
{
    global $conn;
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

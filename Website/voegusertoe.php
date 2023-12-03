<?php
//include "./config/database.php";

$name = $_GET["name"];
$email = $_GET["email"];
$password = $_GET["password"];
$dsn = "mysql:host=localhost;dbname=project_tennis";
$dbusername = "super";
$dbpassword = "Project_Webdev";


try {
    $pdo = new PDO($dsn, $dbusername, $dbpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $query = "INSERT INTO tblspelers (gebruikersnaam, password, email) VALUES (?,?,?);";
    //$query = "INSERT INTO tblspelers (gebruikersnaam, password, email) VALUES (:username,:password,:email);"; //dit is het gebruik van named parameters
    //$query = "SELECT * FROM tblgames;";
    $stmt = $pdo->prepare($query);

    /*
    $stmt->bindParam(":username", $username);
    $stmt->bindParam(":password", $pwd);
    $stmt->bindParam(":email", $email);

    $stmt->execute();
    */

    $stmt->execute([$name, $password, $email]);
    //$stmt->execute();
    //$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    //print_r($results[0]);



    $pdo = null;
    $stmt = null;

    die(); //als je iets hebt met een connectie, anders exit();
} catch (PDOException $e) {
    die("Query failed: " . $e->getMessage());
}

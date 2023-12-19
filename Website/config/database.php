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
}

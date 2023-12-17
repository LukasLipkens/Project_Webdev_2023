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
}

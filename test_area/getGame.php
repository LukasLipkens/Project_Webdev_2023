<?php
include "./config/database.php";

$sql = "SELECT * FROM tblgames;";

$query = mysqli_query($conn, $sql);

if ($query) {
    $result = mysqli_fetch_all($query);
    if (!empty($result)) {
        print_r($result);
    }
}

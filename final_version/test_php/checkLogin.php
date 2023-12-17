<?php
session_start();

if (isset($_SESSION["user"])) {
    var_dump($_SESSION["user"]);
} else {
    echo "guest";
}

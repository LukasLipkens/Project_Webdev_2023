<?php include 'header.php'; ?>
<?php
$name = "";
$password = "";
$nameErr = $passErr = "";
//form submit
if (isset($_POST['submit'])) {
    //check name

    if (empty($_POST['name'])) {
        $nameErr = 'name is required';
    } else {
        $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
        // var_dump($name);
    }

    //check password
    if (empty($_POST['password'])) {
        $passErr = 'Password is required';
    } else {
        $password = $_POST['password'];
    }
    if (empty($nameErr) && empty($passErr)) {
        //data base access

        $sql = "SELECT * FROM tblspelers;";
        $result = mysqli_query($conn, $sql);
        if ($result) {
            $arrSpelers = mysqli_fetch_all($result, MYSQLI_ASSOC);
            //var_dump($arrSpelers);
            $passCheck = "";
            foreach ($arrSpelers as $speler) {
                if ($speler["gebruikersnaam"] == $name && $speler["password"] == $password) {
                    echo "login success";
                    $_SESSION["speler"] = $speler;
                }
            }
            if (empty($_SESSION["speler"])) {
                echo "login mislukt";
            }
        } else {
            //error
            echo 'Error: ' . mysqli_error($conn);
        }
    }

    //testen wat mogelijk is bij database
    $t_sql = 'SELECT * FROM tblspelers WHERE gebruikersnaam= "' . $name . '" AND password ="' . $password . '";';
    $t_result = mysqli_query($conn, $t_sql);
    $t_arr = mysqli_fetch_all($t_result, MYSQLI_ASSOC);
    var_dump($t_arr);
}
?>


<img src="logo.svg" class="w-25 mb-3" alt="">
<form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" class="mt-4 w-75" method="post">
    <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" class="form-control <?php echo $nameErr ? 'is-invalid' : null; ?> " id="name" name="name" placeholder="Enter your name">
        <div class="invalid-feedback">
            <?php echo $nameErr; ?>
        </div>
    </div>
    <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control <?php echo $emailErr ? 'is-invalid' : null; ?>" id="password" name="password" placeholder="Enter your password">
        <div class="invalid-feedback">
            <?php echo $emailErr; ?>
        </div>
    </div>
    <div class="mb-3">
        <input type="submit" name="submit" value="Login" class="btn btn-dark w-100">
    </div>
</form>
<?php include 'footer.php'; ?>
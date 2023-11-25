<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tennis website</title>
  <script type="module" src="app.js"></script>
</head>

<body>
  <?php session_start();
  print_r($_SESSION);
  echo($_SESSION[0]);
  ?>
  <app-comp></app-comp>
</body>

</html>
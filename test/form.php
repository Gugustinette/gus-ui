<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Document</title>

    <script type="module" src="../src/gus_ui.js"></script>
</head>
<body>
    <gus-ui>
        <gus-paragraph>
        <?php 
            $username = $_GET["username"];
            $password = $_GET["password"];

            echo $username;
            echo "<br>";
            echo $password;
        ?>
        </gus-paragraph>
    </gus-ui>
</body>
</html>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minesweeper</title>
    <link rel="stylesheet" href="./index.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Rubik&display=swap" rel="stylesheet">
    <link rel="apple-touch-icon" sizes="180x180" href="../Images/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="../Images/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="../Images/favicon-16x16.png">
    <link rel="manifest" href="../Images/site.webmanifest">
</head>
<body>
    <?php
        $server="localhost";
        $username="root";
        $password="";
        $database="minesweeper";
        $conn=new mysqli($server,$username,$password,$database);
        session_start();
        if(!isset($_SESSION["score"]))
        {
            header("Location: ../index.php");
        }
    ?>
    <header>
        <h1 id="title">Minesweeper</h1>
        <p id="playername"><?php echo $_SESSION["username"]?></p>
        <button id="logout"><a href="../logout.php">Logout</a></button>
    </header>
    <div id="main-container">
        <div id="container">
        </div>
        <div id="side-container">
            <div id="scoreTable">
                <p id="currentScore" class="score">Time: 0</p>
                <p id="highScore" class="score">Personal Best: <?php echo $_SESSION["score"]?></p>
            </div>
            <div id="button-bar">
                <button id="start-button">New Game</button>
                <h1 id="result" style="height:60px"></h1>
            </div>
        </div>
    </div>
</body>
<script src="./index.js"></script>
</html>
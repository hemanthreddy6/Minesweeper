<?php
    $name=$_POST["name"];
    $score=intval($_POST["score"]);
    $server="localhost";
    $username="root";
    $password="";
    $database="minesweeper";
    $conn=new mysqli($server,$username,$password,$database);
    $result = $conn->query("UPDATE userdata SET Score=$score WHERE Name='$name'");
    $conn->close();
?>
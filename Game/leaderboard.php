<!DOCTYPE html>
<html>
<head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap" rel="stylesheet">
    <style>
        table{
            width: 100%;
            border-collapse: collapse;
            background-color: #FFFFFF;
            margin-top: 20px;
            margin-bottom: 20px;
        }
        table,td,th{
            border: 1px solid black;
            padding: 5px;
            font-family: Poppins;
        }
    </style>
</head>
<body>
<?php
    $server="localhost";
    $username="root";
    $password="";
    $database="minesweeper";
    $conn=new mysqli($server,$username,$password,$database);
    $result=$conn->query("SELECT Name, Score FROM userdata WHERE Score>0 ORDER BY Score ASC");
    echo "<table>
    <tr style='background-color:#0A6EBD;color:white'>
        <th colspan='3'>Leaderboard</th>
    </tr>
    <tr>
        <th style='width:20%'>Rank</th>
        <th>Name</th>
        <th style='width:25%'>Score</th>
    </tr>";
    $row;
    $color=array("#FFD93D","#9DB2BF","#C38154",);
    for($i=0;$i<3;$i++)
    {
        if($row=$result->fetch_assoc())
        {
            echo "<tr style='background-color:".$color[$i]."'>
                <td>".($i+1)."</td>
                <td>".$row["Name"]."</td>
                <td>".$row["Score"]."</td>
            </tr>";
        }
        else
        {
            break;
        }
    }
    echo "</table>";
?>
</body>
</html>
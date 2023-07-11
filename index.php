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
    <link rel="apple-touch-icon" sizes="180x180" href="./Images/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="./Images/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="./Images/favicon-16x16.png">
    <link rel="manifest" href="./Images/site.webmanifest">
</head>
<body>
    <?php
        $nameerror=$passerror=$emailerror="";
        $name=$pass=$email="";
        $form="";
        if($_SERVER["REQUEST_METHOD"]=="POST")
        {
            if(isset($_POST["signin"]))
            {
                $form="signin";
                $server="localhost";
                $username="root";
                $password="";
                $database="minesweeper";
                $conn=new mysqli($server,$username,$password,$database);

                $name=$_POST["username"];
                $pass=$_POST["password"];

                $result=$conn->query("SELECT COUNT(*) FROM userdata WHERE Name='$name' AND Password='$pass'");
                $row=$result->fetch_array();

                if($row[0]!=0)
                {
                    session_start();
                    $_SESSION["username"]=$name;
                    $result2=$conn->query("SELECT Score FROM userdata WHERE Name='$name'");
                    $row=$result2->fetch_array();
                    $_SESSION["score"]=$row[0];
                    header("Location: ./Game/index.php");
                    exit();
                }
                else
                {
                    $nameerror="Invalid Username";
                    $passerror="Invalid Password";
                }
            }
            else if(isset($_POST["signup"]))
            {
                $form="signup";
                $server="localhost";
                $username="root";
                $password="";
                $database="minesweeper";
                $conn=new mysqli($server,$username,$password,$database);

                $alert=false;
                $error=false;

                if(isset($_POST["username"]))
                {
                    $name=$_POST["username"];
                    if(!preg_match("/^[a-zA-Z0-9-' ]*$/", $name)) {
                        $nameerror="Only Alphabets and Digits are allowed";
                        $error=true;
                    }
                }
                else
                {
                    $nameerror="Username is required";
                    $error=true;
                }

                if(isset($_POST["email"]))
                {
                    $email=$_POST["email"];
                    if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                        $emailerror="Invalid e-mail";
                        $error=true;
                    }
                }
                else
                {
                    $emailerror="Email is required";
                    $error=true;
                }

                if(isset($_POST["password"]))
                {
                    $pass=$_POST["password"];
                    if(!preg_match("/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/", $pass)) {
                        $passerror = "Invalid password format";
                        $error = true;
                    }
                }
                else
                {
                    $passerror="Password is required";
                    $error=true;
                }

                if($error==false)
                {
                    $result1=$conn->query("SELECT COUNT(*) FROM userdata WHERE Name='$name'");
                    $result2=$conn->query("SELECT COUNT(*) FROM userdata WHERE Email='$email'");
                    $namer=$result1->fetch_array();
                    $emailr=$result2->fetch_array();

                    if($namer[0]==0&&$emailr[0]==0)
                    {
                        $result3=$conn->query("INSERT INTO userdata VALUES(0,'$name','$email','$pass',0)");
                        if($result3)
                        {
                            session_start();
                            $_SESSION["username"]=$name;
                            $_SESSION["score"]=0;
                            header("Location: ./Game/index.php");
                            exit();
                        }
                    }
                    else if($namer[0]!=0)
                    {
                        $nameerror="Username already taken";
                        $error=true;
                    }
                    else if($emailr[0]!=0)
                    {
                        $emailerror="Email already taken";
                        $error=true;
                    }
                }
            }
        }
    ?>
    <div id="popup">
        <div id="popup-container">
            <div id="promo-image">
                <h1>MINESWEEPER</h1>
                <figure>
                    <img id="logor" src="./Images/gameplay.png">
                    <figcaption>Gameplay</figcaption>
                </figure>
            </div>
            <div id="login-form">
                <form id="signInForm" action="./index.php" method="POST">
                    <h2 id="login-title">Welcome Back</h2>
                    <input type="text" id="userName" name="username" placeholder="Username" value="<?php echo $name;?>"><p class="error"><?php echo $nameerror?></p><br>
                    <input type="password" id="password" name="password" placeholder="Password"><p class="error"><?php echo $passerror?></p><br>
                    <input type="submit" id="signin" value="Sign in" name="signin"><br>
                    <p>Don't have an account? <a id="signUpText">Sign up</a></p>
                </form>
                <form id="signUpForm" action="./index.php" method="POST">
                    <h2 id="login-title">Get Started</h2>
                    <input type="text" id="userName" name="username" placeholder="Username" value="<?php echo $name;?>"><p class="error"><?php echo $nameerror?></p><br>
                    <input type="text" id="email" name="email" placeholder="email" value="<?php echo $email;?>"><p class="error"><?php echo $emailerror?></p><br>
                    <input type="password" id="password" name="password" placeholder="Password"><p class="error"><?php echo $passerror?></p><br>
                    <input type="submit" id="signup" value="Sign up" name="signup"><br>
                    <p>Already has an account? <a id="signInText">Sign in</a></p>
                </form>
            </div>
        </div>
    </div>
</body>
<script src="./index.js"></script>
<script>
    <?php
        if($form=="signin")
        echo "signin()";
        else
        echo "signup()";
    ?>
</script>
</html>
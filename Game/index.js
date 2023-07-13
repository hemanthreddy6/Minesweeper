let highScore=0;
let currentScore;
let startTime,endTime;
let scoreUpdater;
let unlockCount;
let winning;
let currentTileID="none";
let longTouch;
document.addEventListener("DOMContentLoaded",createGame);
function createGame()
{
    highScore=parseInt((document.getElementById("highScore").innerHTML).substring(15,));
    for(let i=0;i<20;i++)
    {
        let dummy=document.createElement("div");
        dummy.style.flexDirection="row";
        for(let j=0;j<20;j++)
        {
            let dum=document.createElement("div");
            dum.classList.add("tile");
            dum.id=j+"-"+i;
            dummy.appendChild(dum);
        }
        document.getElementById("container").appendChild(dummy);
    }
    document.getElementById("start-button").addEventListener("click",initializeGame);
    document.getElementById("logout").addEventListener("click",logout);
    addListeners();
    updateLeaderboard();
    setInterval(updateLeaderboard,10000);
}
function initializeGame()
{
    currentScore=0;
    unlockCount=0;
    winning=1;
    document.getElementById("currentScore").innerHTML="Time: 0";
    startTime=new Date().getTime() / 1000;
    let tile;
    for(let i=0;i<20;i++)
    {
        for(let j=0;j<20;j++)
        {
            tile=document.getElementById(i+"-"+j);
            tile.innerHTML="";
            tile.classList.remove("mine");
            tile.classList.remove("unlocked");
            tile.classList.remove("flagged");
            tile.classList.remove("hasNumber");
        }
    }
    let count=50,x,y;
    while(count>0)
    {
        x=Math.floor(20*Math.random());
        y=Math.floor(20*Math.random());
        if(document.getElementById(x+"-"+y).classList.contains("mine")||(x==0&&y==0))
        continue;
        else
        {
            document.getElementById(x+"-"+y).classList.add("mine");
            count--;
            console.log(x+"-"+y);
        }
    }
    document.getElementById("result").innerHTML="";
    clearInterval(scoreUpdater);
    scoreUpdater=setInterval(updateScore,1000);
    document.getElementById("result").innerHTML="Playing";
    document.getElementById("result").style.color="black";
}
function addListeners()
{
    let tile;
    document.addEventListener("keypress",function(e){
        if(e.code == "Space") {
            e.preventDefault();
          }
        if(winning==1)
        checkKeyPress(e);
    });
    for(let i=0;i<20;i++)
    {
        for(let j=0;j<20;j++)
        {
            tile=document.getElementById(i+"-"+j);
            tile.addEventListener("click",function(e){
                if(winning==1)
                checkClick(e);
            });
            tile.addEventListener("mouseleave",function(e){
                mouseOut(e);
            });
            tile.addEventListener("mouseenter",function(e){
                mouseOver(e);
            });
            tile.addEventListener("touchstart",function(e){
                longTouch=setTimeout(checkLongPress,500);
            });
            tile.addEventListener("touchend",function(e){
                clearTimeout(longTouch);
            })
        }
    }
}
function checkClick(e)
{
    let tile=document.getElementById(e.target.id).classList;
    if(tile.contains("mine"))
    {
        winning=0;
        gameOver();
    }
    else if(!tile.contains("unlocked")&&!tile.contains("flagged"))
    {
        bfs(getX(e.target.id),getY(e.target.id));
    }
}
function bfs(x,y)
{
    let countOfMine=0,a,b;
    for(let i=-1;i<=1;i++)
    {
        for(let j=-1;j<=1;j++)
        {
            if(i==0&&j==0)
            continue;
            else
            {
                a=x+i;
                b=y+j;
                if(!valid(a,b))
                continue;
                let tile=document.getElementById(a+"-"+b);
                if(tile.classList.contains("mine"))
                {
                    countOfMine++;
                }
            }
        }
    }
    // alert(countOfMine);
    if(countOfMine!=0)
    {
        let tile=document.getElementById(x+"-"+y);
        tile.innerHTML=countOfMine;
        styleTheTile(tile,countOfMine);
        tile.classList.add("unlocked");
        tile.classList.add("hasNumber")
        unlockCount++;
        return;
    }
    else
    {
        document.getElementById(x+"-"+y).classList.add("unlocked");
        unlockCount++;
        for(let i=-1;i<=1;i++)
        {
            for(let j=-1;j<=1;j++)
            {
                if(i==0&&j==0)
                continue;
                else
                {
                    a=x+i;
                    b=y+j;
                    if(!valid(a,b))
                    continue;
                    let tile=document.getElementById(a+"-"+b);
                    if(tile.classList.contains("mine"))
                    {
                        continue;
                    }
                    if(!tile.classList.contains("unlocked")&&!tile.classList.contains("flagged"))
                    {
                        bfs(a,b);
                    }
                }
            }
        }
    }
}
function valid(x,y)
{
    if(x>=0&&x<=19&&y>=0&&y<=19)
    return true;
    return false;
}
function getX(str)
{
    return parseInt(str.slice(0,str.search('-')));
}
function getY(str)
{
    return parseInt(str.slice(str.search('-')+1,str.length));
}
function styleTheTile(tile,count)
{
    switch(count)
    {
        case 1:
            tile.style.color="blue";
            break;
        case 2:
            tile.style.color="green";
            break;
        case 3:
            tile.style.color="red";
            break;
        case 4:
            tile.style.color="blueviolet";
            break;
        case 5:
            tile.style.color="brown";
            break;
        case 6:
            tile.style.color="cyan";
            break;
        case 7:
            tile.style.color="black";
            break;
        case 8:
            tile.style.color="white";
            break;
    }
}
function updateScore()
{
    currentScore=Math.floor(new Date().getTime() / 1000 - startTime);
    $("#currentScore").html("Time: "+currentScore);

    if(unlockCount==350)
    gameOver();
}
function gameOver()
{
    if(winning==1)
    {
        document.getElementById("result").style.color="green";
        document.getElementById("result").innerHTML="You Won!";
        winning=0;
        if((highScore>currentScore||highScore==0)&&(unlockCount==350))
        {
            highScore=currentScore;
            $("#highScore").html("Personal Best: "+highScore);
            updateDatabase();
        }
    }
    else
    {
        document.getElementById("result").style.color="red";
        document.getElementById("result").innerHTML="You Lost.";
    }
    displayMines();
    clearInterval(scoreUpdater);
}
function mouseOver(e)
{
    if(winning==1)
    currentTileID=e.target.id;
}
function mouseOut(e)
{
    if(e.target.id==currentTileID&&winning==1)
    currentTileID="none";
}
function checkKeyPress(e)
{
    if(currentTileID=="none"||e.code!="Space")
    return;
    else
    {
        let tile=document.getElementById(currentTileID);
        if(tile.classList.contains("unlocked"))
        {
            if(!tile.classList.contains("hasNumber"))
            return;
            else
            {
                spaceOnNumber();
            }
        }
        else
        {
            if(tile.innerHTML!="<img src=\"../Images/red-flag.png\" width=\"18px\" height=\"18px\">"&&
            tile.innerHTML!="<img src=\"../Images/red-flag.png\" width=\"12px\" height=\"12px\">")
            {
                console.log(getComputedStyle(tile).height=="20px");
                if(getComputedStyle(tile).height=="20px")
                    tile.innerHTML="<img src=\"../Images/red-flag.png\" width=\"18px\" height=\"18px\">";
                else
                    tile.innerHTML="<img src=\"../Images/red-flag.png\" width=\"12px\" height=\"12px\">"
                
                tile.classList.add("flagged");
            }
            else
            {
                tile.innerHTML="";
                tile.classList.remove("flagged");
            }
        }
    }
}
function spaceOnNumber()
{
    let x,y,tile,actualCount,realCount=0;
    actualCount=document.getElementById(currentTileID).innerHTML;
    for(let i=-1;i<=1;i++)
    {
        for(let j=-1;j<=1;j++)
        {
            if(i==0&&j==0)
            continue;

            x=getX(currentTileID)+i;
            y=getY(currentTileID)+j;
            if(x<0||x>19||y<0||y>19)
            continue;

            tile=document.getElementById(x+"-"+y).classList;
            if(tile.contains("flagged"))
            realCount++;
        }
    }

    console.log(actualCount+"--"+realCount);
    if(realCount!=actualCount)
    return;

    for(let i=-1;i<=1;i++)
    {
        for(let j=-1;j<=1;j++)
        {
            if(i==0&&j==0)
            continue;

            x=getX(currentTileID)+i;
            y=getY(currentTileID)+j;
            if(x<0||x>19||y<0||y>19)
            continue;

            tile=document.getElementById(x+"-"+y).classList;
            if(tile.contains("mine")&&!tile.contains("flagged"))
            {
                winning=0;
                gameOver();
            }
            else if(!tile.contains("unlocked")&&!tile.contains("flagged"))
            {
                bfs(x,y);
            }
        }
    }

    console.log(document.getElementById("container").height);
}
function updateDatabase()
{
    let name=document.getElementById("playername").innerHTML;
    let score = new XMLHttpRequest();
    score.open("POST","updateDatabase.php",true);
    let data=new FormData();
    data.append("name",name);
    data.append("score",highScore);
    score.send(data);
    console.log(name+" "+highScore);
}
function updateLeaderboard()
{
    let board=new XMLHttpRequest();
    board.onreadystatechange=function(){
        if(this.readyState==4&&this.status==200)
        {
            document.getElementById("leaderboard").innerHTML=this.responseText;
        }
    }
    board.open("POST","leaderboard.php",true);
    board.send();
}
function logout()
{
    window.location.href="../logout.php";
}
function displayMines()
{
    let tile;
    for(let i=0;i<20;i++)
    {
        for(let j=0;j<20;j++)
        {
            tile=document.getElementById(i+"-"+j);
            if(tile.classList.contains("mine"))
            {
                if(getComputedStyle(tile).height=="20px")
                    tile.innerHTML="<img src=\"../Images/red-flag.png\" width=\"18px\" height=\"18px\">";
                else
                    tile.innerHTML="<img src=\"../Images/red-flag.png\" width=\"12px\" height=\"12px\">";
            }
            else
            {
                continue;
            }
        }
    }
}
function checkLongPress()
{
    let tile=document.getElementById(currentTileID);
    if(tile.classList.contains("unlocked"))
    {
        if(!tile.classList.contains("hasNumber"))
        return;
        else
        {
            spaceOnNumber();
        }
    }
    else
    {
        if(tile.innerHTML!="<img src=\"../Images/red-flag.png\" width=\"18px\" height=\"18px\">"&&
        tile.innerHTML!="<img src=\"../Images/red-flag.png\" width=\"12px\" height=\"12px\">")
        {
            console.log(getComputedStyle(tile).height=="20px");
            if(getComputedStyle(tile).height=="20px")
                tile.innerHTML="<img src=\"../Images/red-flag.png\" width=\"18px\" height=\"18px\">";
            else
                tile.innerHTML="<img src=\"../Images/red-flag.png\" width=\"12px\" height=\"12px\">"
            
            tile.classList.add("flagged");
        }
        else
        {
            tile.innerHTML="";
            tile.classList.remove("flagged");
        }
    }
}
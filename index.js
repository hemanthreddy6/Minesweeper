document.addEventListener("DOMContentLoaded",createGame);
function createGame()
{
    for(let i=0;i<20;i++)
    {
        let dummy=document.createElement("div");
        dummy.style.flexDirection="row";
        for(let j=0;j<20;j++)
        {
            let dum=document.createElement("div");
            dum.classList.add("tile");
            dum.id=j+"-"+i;
            dum.addEventListener("click",function(e){
                checkClick(e);
            });
            dummy.appendChild(dum);
        }
        document.getElementById("container").appendChild(dummy);
    }
    let count=75,x,y;
    while(count>0)
    {
        x=Math.floor(20*Math.random());
        y=Math.floor(20*Math.random());
        if(document.getElementById(x+"-"+y).classList.contains("mine"))
        continue;
        else
        {
            document.getElementById(x+"-"+y).classList.add("mine");
            count--;
            console.log(x+"-"+y);
        }
    }
}
function checkClick(e)
{
    let tileID=e.target.id;
    if(document.getElementById(tileID).classList.contains("mine"))
    {
        alert("YOU CLICKED A MINE");
    }
    else
    {
        bfs(getX(tileID),getY(tileID));
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
        return;
    }
    else
    {
        document.getElementById(x+"-"+y).classList.add("unlocked");
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
                    if(tile.classList.contains("unlocked")==false)
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
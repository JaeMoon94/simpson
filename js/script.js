var marks = ["<img class = 'donut' src='img/donut.png'>","<img class = 'skateboard' src= 'img/skateboard.png'>"];
var isChanged;
var turn = 0;
var players = [];
var messagecount = 0;
var backgroundsound = new Audio('bgm/theme.mp3');
var homerSound = new Audio('bgm/doh.mp3');
var bartSound = new Audio('bgm/carumba.wav');
var totals = [0,0];
var winPoints = [7,56,73,84,146,273,292,448];
var gameOver = false;
var draw = false;
function startGame()
{
    backgroundsound.play();
    players[0] = prompt("enter player 1");
    players[1] = prompt("enter player 2");
    
    if(players[0] == "" || players[0] == null) players[0] = "Homer";
    if(players[1] == "" || players[1] == null) players[1] = "Bart";

    showmessage(turn);
   
}
function playGame(clickedDiv,divValue)
{ 
    
    if(!gameOver)
    {
        clickedDiv.innerHTML = marks[turn];
        backgroundsound.muted = true;

        totals[turn] += divValue;

        if(isWin())
        {
            if(turn == 0) homerSound.play(); else bartSound.play();
            document.getElementById("showwinner").innerText = players[turn] + " is the WINNER!";
        }
        else if(draw)
        {
            if(turn == 0) homerSound.play(); else bartSound.play();
            document.getElementById("showwinner").innerText = "DRAW!";
        }
        else {

            if(turn == 0) homerSound.play(); else bartSound.play();
            if(turn) turn = 0; else turn = 1;
            clickedDiv.attributes["0"].nodeValue = "";
        
            showmessage(turn);
        }
    }
    if(gameOver)
    {
        document.getElementById("again").className = "show";
    }
     
}

function showmessage(turn)
{   
    var info = document.createElement('li');
    info.innerHTML = players[turn] + "'s turn!";
    document.getElementById("message").appendChild(info);
    var nodelist = document.getElementById("message");

    if(messagecount >= 4)
    {
        document.getElementById("message").removeChild(nodelist.childNodes[1]);
    }
    messagecount++;
}

function isWin()
{
    for( i = 0; i < winPoints.length; i++) 
    {
        if((totals[turn] & winPoints[i]) == winPoints[i]) {gameOver = true; return true;}
    }

    if(totals[0]+totals[1] == 511) {draw = true; gameOver = true;}
    
    return false;
}
function reset()
{
    location.replace("tictactoe.html");
}

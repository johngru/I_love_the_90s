var play = document.querySelector("#play")
var restart = document.querySelector("#restart")
var cells = document.querySelectorAll("td")
var count = 0;
var startgame=false;

// var cell = document.querySelector("#row2 #column1")

function StartGame(){
//Function for Event Listen on Play
    for(cell of cells){
        cell.innerText=" ";
    }
    startgame=true;
    console.log('activated StartGame')    
}

function Restart(){
//Function for Event Listen on Restart
for(cell of cells){
    cell.innerText=" ";
}
startgame=true;
    console.log('activated Restart')   
}

function countUpdate(){
    count++;
}

function Turn(){
    return count%2;   
}

function Play(cell){
    if(Turn()===0){
        cell.innerText="O";
    }
    else{
        cell.innerText="X"
        }
    countUpdate();
    }


play.addEventListener('click', function(){StartGame()});
restart.addEventListener('click',function(){Restart()});
for(var i =0;i<cells.length;i++){
    cells[i].addEventListener('click',function(){Play(this)});
}


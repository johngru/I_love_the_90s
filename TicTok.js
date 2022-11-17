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
    count = 0;
    console.log('activated StartGame')    
}

function Restart(){
//Function for Event Listen on Restart
for(cell of cells){
    cell.innerText=" ";
}
    startgame=true;
    count=0;
    console.log('activated Restart')   
}

function countUpdate(){
    count++;
}

function Turn(){
    return count%2;   
}

function Play(cell){
    if(startgame==true){
        if(Turn()===0){
            cell.innerText="O";
        }
        else{
            cell.innerText="X"
            }
        countUpdate();
        DrawCheck();
        WinnerCheck();
    }
    else{
        Restart();
    }
}

function DrawCheck(){
    if(count===9){
        cells[4].innerHTML=`<h1>DRAW!</h1>`;       
    }
}

function WinnerCheck(){
    var columns = ['column1','column2','column3']
    var rows = ['row1','row2','row3']
    var diag1 = [0,4,8];
    var diag2 = [2,4,6];
    var diag1check='';
    var diag2check='';

    for(row of rows){
        var rowcheck=''
        for(column of columns){
            var temp = document.querySelector(`#${row} #${column}`);
            
            rowcheck+=temp.innerText;
            if(rowcheck==='OOO' || rowcheck==='XXX'){
                cells[4].innerHTML=`<h1>${rowcheck[0]}<br>WINNER!</h1>`;
                startgame=false;
                count=0;
            }
        }
    }

    for(column of columns){
        var colcheck='';

        for(row of rows){
            var temp = document.querySelector(`#${row} #${column}`);
            colcheck+=temp.innerText;
            if(colcheck==='OOO' || colcheck==='XXX'){
                cells[4].innerHTML=`<h1>${colcheck[0]}<br>WINNER!</h1>`;
                startgame=false;
                count=0;
            }                    
        }
    }

    for(i of diag1){
        var temp = cells[i].innerText;
        diag1check+=temp;
        if(diag1check==='OOO' || diag1check==='XXX'){
            cells[4].innerHTML=`<h1>${diag1check[0]}<br>WINNER!</h1>`;
            startgame=false;
            count=0;
        }   
    }
    for(j of diag2){
        var temp = cells[j].innerText;
        diag2check+=temp;
        if(diag2check==='OOO' || diag2check==='XXX'){
            cells[4].innerHTML=`<h1>${diag2check[0]}<br>WINNER!</h1>`;
            startgame=false;
            count=0;
        }   
    }

        console.log(row.innerText)
};


play.addEventListener('click', function(){StartGame()});
restart.addEventListener('click',function(){Restart()});
for(var i =0;i<cells.length;i++){
    cells[i].addEventListener('click',function(){Play(this)});
}


var play = document.querySelector("#play")
var restart = document.querySelector("#restart")
var cells = document.querySelectorAll("td")
var count = 0;
var startgame=false;


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
    $('#result').text(``);

    $("input#bluePlayer").attr('disabled',false);
    $('button#blueSubmit').html('Enter')
    $("input#redPlayer").attr('disabled',false);
    $('button#redSubmit').html('Enter')


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


function EmptyRow(col){
    var rows = $('tr');
    var emptyRow = 'row0';
    for(row of rows){
        if($('tr#'+row.id+' td#'+col).html()==' '){
            emptyRow = row.id;
            // console.log(emptyRow);
        }
    }
    // console.log(emptyRow);
   return emptyRow;
}


function Play(cell){
    var col = $(cell).attr('id');        
    var row = EmptyRow(col);

    LockNames()

    if(row=='row0'&&startgame==true){
        $('#result').text(`That column is filled.  Try another one.`);
    }
    
    else if(row!='row0'&&startgame==true){         
        $('#result').text(``);
        playerTurn=Turn();
        if(playerTurn===0){
            $('tr#'+row+ ' td#'+col).html(`<button type="button" class="btn btn-danger btn-circle btn-xl"> </button>`);
            }
        else{
            $('tr#'+row+ ' td#'+col).html(`<button type="button" class="btn btn-primary btn-circle btn-xl"> </button>`);
            }
        countUpdate();
        DrawCheck();
        var winner = WinnerCheck(row,col,playerTurn);
        if(winner!==null){
            startgame=false;
            playerNames = NameLookup();
            winnerName=playerNames[winner]
            $('#result').text(`${winnerName} WINS!`);
        }

    }
    else{
        Restart();
    }
}

function LockNames(){
    if(count===1){
        $("input#bluePlayer").attr('disabled',true);
        $('button#blueSubmit').html(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-lock2" viewBox="0 0 16 16">
        <path d="M8 5a1 1 0 0 1 1 1v1H7V6a1 1 0 0 1 1-1zm2 2.076V6a2 2 0 1 0-4 0v1.076c-.54.166-1 .597-1 1.224v2.4c0 .816.781 1.3 1.5 1.3h3c.719 0 1.5-.484 1.5-1.3V8.3c0-.627-.46-1.058-1-1.224z"/>
        <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
    </svg>`)

    $("input#redPlayer").attr('disabled',true);
    $('button#redSubmit').html(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-lock2" viewBox="0 0 16 16">
    <path d="M8 5a1 1 0 0 1 1 1v1H7V6a1 1 0 0 1 1-1zm2 2.076V6a2 2 0 1 0-4 0v1.076c-.54.166-1 .597-1 1.224v2.4c0 .816.781 1.3 1.5 1.3h3c.719 0 1.5-.484 1.5-1.3V8.3c0-.627-.46-1.058-1-1.224z"/>
    <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
</svg>`)
    }
}


function DrawCheck(){
    if(count===42){
        $('#result').text(`DRAW!`);
        startgame=false;
        count=0;       
    }
}

function WinnerCheck(row,col,playerTurn){

    var winner=null;
    var colorCheck = {0:'.btn-danger',1:'.btn-primary'};

    // Check Row for Win:
    console.log('RowCheck')
    rowWin=0;
    columns=$('tr#'+row+ ' td');
    for(column of columns){
        if($(column).find(colorCheck[playerTurn]).length==1){
            rowWin++;
            console.log(rowWin);
            if(rowWin==4){
                winner = playerTurn;
                console.log(`WINNER IS:\t${winner}`)
                return winner;
            }
        }
        else{
            rowWin=0;
        }    
    }

    // Check Column for Win:
    console.log('ColCheck')
    colWin=0;
    rows=$('tr');
    for(r of rows){
        if($(r).children('td#'+col).find(colorCheck[playerTurn]).length==1){
            colWin++;
            console.log(colWin);
            if(colWin==4){
                winner = playerTurn;
                console.log(`WINNER IS:\t${winner}`)
                return winner;
            }
        }
        else{
            colWin=0;
        }

    }

    //Check for forward slash diagonal

    console.log("Forward Slash Check")

    edges = findEdges(col,row)
    forwardDiagWin=0;

    currentRow = edges.bottomLeft.row;
    currentCol = edges.bottomLeft.col;

    endRow = edges.topRight.row;
    endCol = edges.topRight.col;

    while(currentRow!==endRow){
        if($('tr#'+currentRow+' td#'+currentCol).find(colorCheck[playerTurn]).length==1){
            forwardDiagWin++;
            console.log(forwardDiagWin);
            if(forwardDiagWin==4){
                winner = playerTurn;
                console.log(`WINNER IS:\t${winner}`)
                return winner;
            }
        }
        else{
            forwardDiagWin=0;
        }
        var current=incrementUpRight(currentCol,currentRow);
        currentRow=current.row;
        currentCol = current.col;
    }


    console.log("### Begin Back Slash Check")

    BackDiagWin=0;

    currentRow = edges.bottomRight.row;
    currentCol = edges.bottomRight.col;

    endRow = edges.topLeft.row;
    endCol = edges.topLeft.col;

    while(currentRow!==endRow){
        if($('tr#'+currentRow+' td#'+currentCol).find(colorCheck[playerTurn]).length==1){
            BackDiagWin++;
            console.log(BackDiagWin);
            if(BackDiagWin==4){
                winner = playerTurn;
                console.log(`WINNER IS:\t${winner}`)
                return winner;
            }
        }
        else{
            BackDiagWin=0;
        }
        var current = incrementUpLeft(currentCol,currentRow);
        currentRow = current.row;
        currentCol = current.col;
    }

    return winner;
}


function incrementDownLeft(col,row){
    var nextRowDown=row;
    var nextColumnDown=col;

    if(row!=='row6'){
        var nextRowDown=$('tr#'+row)[0].nextElementSibling.id;    
    }

    if(col!='column1' && row!='row6'){
        var nextColumnDown=$('tr#'+nextRowDown+' td#'+col)[0].previousElementSibling.id;    
    }
    else{
        nextRowDown=row;
        nextColumnDown=col;
    }
    // console.log('next row\t'+nextRowDown);
    // console.log('next col\t'+nextColumnDown);
    return {'row':nextRowDown,'col':nextColumnDown};
}


function incrementDownRight(col,row){
    var nextRowDown=row;
    var nextColumnDown=col;

    if(row!=='row6'){
        var nextRowDown=$('tr#'+row)[0].nextElementSibling.id;    
    }

    if(col!='column7' && row!='row6'){
        var nextColumnDown=$('tr#'+nextRowDown+' td#'+col)[0].nextElementSibling.id;    
    }
    else{
        nextRowDown=row;
        nextColumnDown=col;
    }
    // console.log('next row\t'+nextRowDown);
    // console.log('next col\t'+nextColumnDown);
    return {'row':nextRowDown,'col':nextColumnDown};    
}

function incrementUpRight(col,row){
    var nextRowUP=row;
    var nextColumn=col;

    if(row!=='row1'){
        var nextRowUP=$('tr#'+row)[0].previousElementSibling.id;    
    }

    if(col!='column7' && row!='row1'){
        var nextColumn=$('tr#'+nextRowUP+' td#'+col)[0].nextElementSibling.id;    
    }
    else{
        nextRowUP=row;
        nextColumn=col;
    }
    // console.log('next row\t'+nextRowUP);
    // console.log('next col\t'+nextColumn);
    return {'row':nextRowUP,'col':nextColumn};    
}

function incrementUpLeft(col,row){
    var nextRowUP=row;
    var nextColumn=col;

    if(row!=='row1'){
        var nextRowUP=$('tr#'+row)[0].previousElementSibling.id;    
    }

    if(col!='column1' && row!='row1'){
        var nextColumn=$('tr#'+nextRowUP+' td#'+col)[0].previousElementSibling.id;    
    }
    else{
        nextRowUP=row;
        nextColumn=col;
    }
    // console.log('next row\t'+nextRowUP);
    // console.log('next col\t'+nextColumn);
    return {'row':nextRowUP,'col':nextColumn};    
}

function findEdges(col,row){
    var edges = {
        'bottomLeft':incrementDownLeft(col,row),
        'bottomRight':incrementDownRight(col,row),
        'topRight':incrementUpRight(col,row),
        'topLeft':incrementUpLeft(col,row)
    }

    var count = 0;
    for(edge in edges){
        // console.log(edge);
        found = false;

        var tempCol = col;
        var tempRow = row;

        while(!found){
            if(tempCol!== edges[edge].col){
                tempCol = edges[edge].col;
                tempRow = edges[edge].row;
                if(count==0){
                    edges[edge] = incrementDownLeft(tempCol,tempRow);
                }
                else if (count==1){
                    edges[edge] = incrementDownRight(tempCol,tempRow);
                }
                else if (count==2){
                    edges[edge] = incrementUpRight(tempCol,tempRow);
                }
                else if (count==3){
                    edges[edge] = incrementUpLeft(tempCol,tempRow);
                }
            }
            else{
                count++;
                found = true;
            } 
        }
    }
    return edges;
}



function NameLookup(){
    var redPlayer = $('input#redPlayer')[0].value;
    var bluePlayer = $('input#bluePlayer')[0].value;

    if(redPlayer===''){
        redPlayer='Red Player';
    }
    if(bluePlayer===''){
        bluePlayer='Blue Player';
    }

    names = {0:redPlayer,
    1:bluePlayer}
    
    return names
}


play.addEventListener('click', function(){StartGame()});
restart.addEventListener('click',function(){Restart()});
for(var i =0;i<cells.length;i++){
    cells[i].addEventListener('click',function(){Play(this)});
}



/////Finding columns and tracking mouse/////////


$('td').on('mouseover',function(){
    var col = $(this).attr('id');
    $('td#'+col).css('background-color','#f8f9fa');
})


$('td').on('mouseout',function(){
    var col = $(this).attr('id');
    $('td#'+col).css('background-color','#ecedee');
})


////Entering Player Names//////
$('button#redSubmit').click(function(){
    console.log("button clicked")
    $(this).css('disabled:true')
})

$('button#blueSubmit').click(function(){
    $("input#bluePlayer").attr('disabled',true);
    $(this).html(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-lock2" viewBox="0 0 16 16">
    <path d="M8 5a1 1 0 0 1 1 1v1H7V6a1 1 0 0 1 1-1zm2 2.076V6a2 2 0 1 0-4 0v1.076c-.54.166-1 .597-1 1.224v2.4c0 .816.781 1.3 1.5 1.3h3c.719 0 1.5-.484 1.5-1.3V8.3c0-.627-.46-1.058-1-1.224z"/>
    <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
  </svg>`)
})

$('button#redSubmit').click(function(){
    $("input#redPlayer").attr('disabled',true);
    $(this).html(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-lock2" viewBox="0 0 16 16">
    <path d="M8 5a1 1 0 0 1 1 1v1H7V6a1 1 0 0 1 1-1zm2 2.076V6a2 2 0 1 0-4 0v1.076c-.54.166-1 .597-1 1.224v2.4c0 .816.781 1.3 1.5 1.3h3c.719 0 1.5-.484 1.5-1.3V8.3c0-.627-.46-1.058-1-1.224z"/>
    <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
  </svg>`)
})
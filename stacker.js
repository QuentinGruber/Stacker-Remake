//init
var Xpos = -1;
var Ypos = 9;
var ExtraRed = 2;
var GoingRight = 1;
var InGame = 1;
var Speed = 100;
var ScrollingPoint = 8;
tableCreate();
Board = ArrayCreate();




function tableCreate(){
    var body = document.body,
        tbl  = document.createElement('table');
    tbl.id = "Board";
    tbl.style.width  = '35vw';
    tbl.style.marginLeft = '30vw';
    tbl.style.height  = '35vw';
    tbl.style.border = '1px solid black';

    for(var i = 0; i < 10; i++){ //create row
        var tr = tbl.insertRow();
        for(var j = 0; j < 7; j++){//create column
            var td = tr.insertCell();
            td.style.border = '1px solid black';
            td.style.backgroundColor = "white";
            td.id = "c"+(j+1)+"r"+(i+1);
            }
        }
    
    body.appendChild(tbl);
}

function ScroolingUpdate(){
    
    if(Ypos==ScrollingPoint){
        console.log("is scrooling");
        Ypos++;
    //change Board value
    for (var i = ScrollingPoint+1; i > 11; i++) {
        for (var j = 0; j < 7; j++) {
        
            Board[i][j]=Board[i-1][j]
        }
    }
    console.log("have change board");
    console.log(Board);
    //Update display
    for (var i = 0; i > 10; i++) {
        console.log("Display line updated!");
        for (var j = 0; j < 7; j++) {
            console.log("Display line updated!");
            if(Board[i][j] == 1){
                var Case = document.getElementById("c"+(j+1)+"r"+(i+1));
                Case.style.backgroundColor="red";
            }
            else{
                var Case = document.getElementById("c"+(j+1)+"r"+(i+1));
                Case.style.backgroundColor="white";

            }
    }
    }
    console.log("display updated");
    

}
}

function ArrayCreate(){//create array for logic of the game
    var row = [];
    var column = [];
    
    for (var i = 0; i < 10; i++) {
        column = [];
        for (var j = 0; j < 7; j++) {
        column.push(0);
        }
        row.push(column);
    }
    console.log(row)
    return row;
}


function MoveRed(x){
    if(x==1){//if we go to right
        //console.log("go right");
        Board[Ypos][Xpos-ExtraRed]=0;
        Xpos+=1;
        Board[Ypos][Xpos]=1;
        if(Xpos-ExtraRed>=6){
            GoingRight=0;
        }
       // console.log(Board);

    }
    else{
        //console.log("go left");
        Board[Ypos][Xpos+ExtraRed]=0;
        Xpos-=1;
        Board[Ypos][Xpos]=1;
        if(Xpos+ExtraRed<=0){GoingRight=1;}
        //console.log(Board);
    }

}

function WhereToMove(){
    if(GoingRight==1){
        MoveRed(1);
    }
    else{
        MoveRed(0);
    }
}

function UpdateDisplay(){
    
    for (var i = 0; i < 7; i++) {
        if(Board[Ypos][i] ==1){
            var Case = document.getElementById("c"+(i+1)+"r"+(Ypos+1));
            Case.style.backgroundColor="red";
        }
        else{
            var Case = document.getElementById("c"+(i+1)+"r"+(Ypos+1));
            Case.style.backgroundColor="white";

        }
    }
}

function LaunchRed(){
    var Interval_Wtm = setInterval(function(){WhereToMove();}, Speed);
    var Interval_Ud = setInterval(function(){UpdateDisplay();}, Speed);
    document.onkeydown = function(){
        clearInterval(Interval_Wtm);
        clearInterval(Interval_Ud);
        ScroolingUpdate();
        if(Ypos>0){
            Ypos-=1;
            if(Ypos == 7 && ExtraRed == 2 ||Ypos == 5 && ExtraRed == 2 ){
                ExtraRed -= 1;
            }
            Speed*=0.95;
            LaunchRed();
        }
    }
}

//main
LaunchRed(100);



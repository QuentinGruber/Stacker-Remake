//init
var Xpos = -1;
var Ypos = 14;
var ExtraRed = 2;//extra red cube
var GoingRight = 1;
var InGame = 1;//unused
var LvlLength = 15;//lvl length (no limit) (min 15) automatically adapt
var Speed = 100; //initial speed
var ScrollingPoint = 5;// where we start scrolling
var ScroolCount = 0; //number of times we scrolled 
var AntiSpam = 0;
var CanLose = 0;
var Score_enable = false;
var Score = 0;
var PlayTime = 20;
tableCreate();
Board = ArrayCreate(); //init our board




function tableCreate(){
    var body = document.body,
        tbl  = document.createElement('table');
    tbl.id = "Board";
    tbl.style.width  = '35vw';
    tbl.style.height  = '45vw';
    tbl.style.marginLeft = '30vw';
    tbl.style.marginTop = '3vw';

    for(var i = 0; i < 15; i++){ //create row
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
function ArrayCreate(){//create array for logic of the game
    var row = [];
    var column = [];
    
    for (var i = 0; i < 15; i++) {
        column = [];
        for (var j = 0; j < 7; j++) {
        column.push(0);
        }
        row.push(column);
    }
    return row;
}

function ScroolingUpdate(){
    
    if(Ypos==ScrollingPoint){
        Ypos++;
        ScroolCount++;
        //change Board value
        var BoardSave = Board;
        for (var i = ScrollingPoint+1; i < 10; i++) {
            for (var j = 0; j < 7; j++) {
            
                Board[i][j]=BoardSave[i-1][j]

                //Update display
                if(Board[i][j] == 1){
                    var Case = document.getElementById("c"+(j+1)+"r"+(i+1));
                    Case.style.backgroundColor="blue";
                }
                else{
                    var Case = document.getElementById("c"+(j+1)+"r"+(i+1));
                    Case.style.backgroundColor="white";

                }
            }
        }
    }
    

}

function UpdateDisplay(){
    
    for (var i = 0; i < 7; i++) {
        if(Board[Ypos][i] ==1){
            var Case = document.getElementById("c"+(i+1)+"r"+(Ypos+1));
            Case.style.backgroundColor="blue";
        }
        else{
            var Case = document.getElementById("c"+(i+1)+"r"+(Ypos+1));
            Case.style.backgroundColor="white";

        }
    }


}

function MoveRed(x){
    if(x==1){//if we go to right
        Board[Ypos][Xpos-ExtraRed]=0;
        Xpos+=1;
        Board[Ypos][Xpos]=1;
        if(Xpos-ExtraRed>=6){
            GoingRight=0;
        }

    }
    else{
        Board[Ypos][Xpos+ExtraRed]=0;
        Xpos-=1;
        Board[Ypos][Xpos]=1;
        if(Xpos+ExtraRed<=0){GoingRight=1;}
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
function CheckPlacement(){
    
    for (var i = 0; i < 7; i++) {
        if(Board[Ypos][i] == 1 && Board[Ypos+1][i] != 1){
            var Case = document.getElementById("c"+(i+1)+"r"+(Ypos+1));
            Case.style.backgroundColor="white";
            ExtraRed -= 1 
            if(ExtraRed<0){
                Loose();
                //Case.style.backgroundColor="red";//to let the case we miss on the board
            }
        }
    }
    if(InGame && Score_enable){
        Score+=1;
    
    var ScoreDisplay = document.getElementById("score");
    ScoreDisplay.innerHTML="<h1>"+Score+"</h1>";
    }
}
function Loose(){
    alert('you loose!')
    InGame = 0;
    AntiSpam=0;
}
function Win(){
    alert('you Win!')
    InGame = 0;
    AntiSpam=0;
}
function TimeoutCountdown(){
    console.log(PlayTime+"pt");
    PlayTime -= 1;
    var plt = document.getElementById("Playtime");
    plt.innerHTML = "<p>"+PlayTime+"s"+"</p>";
    if(PlayTime == 0){
        Loose();
    }

}
function LaunchRed(){
    var Interval_Wtm = setInterval(function(){WhereToMove();}, Speed);
    var Interval_Ud = setInterval(function(){UpdateDisplay();}, 1);//display updated every 1msec
    var Interval_Tc = setInterval(function(){TimeoutCountdown();}, 1000); // -1 to PlayTime every 1 sec
    document.onkeydown = function(){
        if(AntiSpam == 0){
            //clear interval
            clearInterval(Interval_Wtm);
            clearInterval(Interval_Ud);
            clearInterval(Interval_Tc);

            
            if(CanLose && InGame){CheckPlacement();} //you can't loose at first stage
            CanLose = 1;//player can loose after first step
             
            Ypos-=1;//up every movement


            PlayTime = (21); //reset playtime

            TimeoutCountdown(); // display playtime updated

            if(Ypos<0 && InGame){//Stop the game when we are at the top of the board
                Win();
            }
            if(InGame){//to stop the game when you lost
                
                if(ScroolCount != (LvlLength-15)){///if we need to scrool again
                    ScroolingUpdate();
                }

                if(Ypos == 11 && ExtraRed == 2 ||Ypos == 7 && ExtraRed == 1 ){
                    ExtraRed -= 1; //when progress in the game even without failure you will lost ExtraRed
                }

                Speed*=0.95; // 5% speed +
                AntiSpam=1;//turn AntiSpam on after a keydown while still in game
                LaunchRed();
            } 
            
        }
    }
    document.onkeyup = function(){//turn off AntiSpam when the key is up
        if(InGame){AntiSpam=0;} //only when in game
    }
}

//main
LaunchRed();



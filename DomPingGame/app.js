/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var players, playerTurn=0, score=0; //currentRoll=0

function Player(){
    this.roundScore=0;
    this.totalScore=0;
    this.setRoundScoreToZero= function() {
        this.roundScore=0;
    }
    this.setTotalScoreToZero= function() {
        this.totalScore=0;
    }
    this.setAllToZero= function() {
        this.roundScore=0;
        this.totalScore=0;
    }

}

function changeTurn(){
    if(playerTurn===0){
                playerTurn=1;
            } else{
                playerTurn=0;
            }
    return playerTurn;
}

players=[new Player(),new Player()];


//SET THE NAME IN STARTING STATE
document.getElementsByClassName("btn-new")[0].addEventListener("click",  function() {
    players[0].setAllToZero();
    players[1].setAllToZero();
    document.getElementById("current-0").innerHTML= players[0].totalScore.toString();
    document.getElementById("current-1").innerHTML= players[0].totalScore.toString();
    document.getElementById("score-0").innerHTML= players[0].roundScore.toString();
    document.getElementById("score-1").innerHTML= players[0].roundScore.toString();
    currentRoll=0;
    console.log('new game');
} )

//ROLL BUTTON LOGIC
document.getElementsByClassName("btn-roll")[0].addEventListener("click", function() {
    score= Math.floor(Math.random()*6)+1;
    document.getElementsByClassName("dice")[0].setAttribute('src','dice-'+score+'.png');
    if(score!==1){
            players[playerTurn].roundScore+=score;
            document.getElementById("current-"+playerTurn).innerHTML=players[playerTurn].roundScore;
    }
    else{
            players[playerTurn].roundScore=0;
            document.getElementById("current-"+playerTurn).innerHTML=players[playerTurn].roundScore;
            changeTurn();
    }
    console.log('roll dice');
});


//HOLD BUTTON LOGIC
document.getElementsByClassName('btn-hold')[0].addEventListener('click', function() {
    players[playerTurn].totalScore=players[playerTurn].totalScore+players[playerTurn].roundScore;
    document.getElementById('score-'+playerTurn).innerHTML=players[playerTurn].totalScore;
    document.getElementById('current-'+playerTurn).innerHTML=0;
    players[playerTurn].roundScore=0;
    console.log("before: ", playerTurn)
    changeTurn();
    console.log("after: ", playerTurn)
    console.log('hold score');
    
})

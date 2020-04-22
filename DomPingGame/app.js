/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//gamePlaying is a state variable indicating if the game is still oging on or not
var players, playerTurn=0, score=0, gamePlaying=true; //currentRoll=0

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


//SET THE GAME IN STARTING STATE
document.querySelector(".btn-new").addEventListener("click",  function() {
    if(gamePlaying){
        players[0].setAllToZero();
        players[1].setAllToZero();
        document.getElementById("current-0").innerHTML= players[0].totalScore.toString();
        document.getElementById("current-1").innerHTML= players[0].totalScore.toString();
        document.getElementById("score-0").innerHTML= players[0].roundScore.toString();
        document.getElementById("score-1").innerHTML= players[0].roundScore.toString();
        currentRoll=0;
    }
    
} )

//ROLL BUTTON LOGIC
document.querySelector(".btn-roll").addEventListener('click', function() {
    console.log(gamePlaying);
    if(gamePlaying){
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
    }
});


//HOLD BUTTON LOGIC
document.querySelector('.btn-hold').addEventListener('click', function() {
   if(gamePlaying){ 
                players[playerTurn].totalScore=players[playerTurn].totalScore+players[playerTurn].roundScore;
                if(players[playerTurn].totalScore>=10){
                            document.getElementById('name-'+playerTurn).textContent="WINNER!";
                            document.querySelector('.dice').style.display = 'none';
                            document.getElementById('name-'+playerTurn).setAttribute('class','winner player-name');
                            document.querySelector('.player-'+playerTurn+'-panel').classList.add('winner');
                            document.querySelector('.player-'+playerTurn+'-panel').classList.add('active');
                            gamePlaying=false;
                        }
                document.getElementById('score-'+playerTurn).innerHTML=players[playerTurn].totalScore;
                document.getElementById('current-'+playerTurn).innerHTML=0;
                players[playerTurn].roundScore=0;
                changeTurn();
            }
    
})

// SUMMARY:
//var x = document.querySelector('#score-0').textContent;
//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
//document.getElementById('current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
//document.getElementById('current-' + activePlayer).style.display = block;
//document.querySelector('.player-0-panel').classList.remove('active');
//document.querySelector('.player-1-panel').classList.add('active');
// document.querySelector('.dice').style.display = 'none';

/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, finalScore, roundScore, gamePlaying;
var activePlayer = 1;

function init() {
    scores = [0, 0];
    roundScore = 0;
    // toggle starting player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    gamePlaying = true;
    finalScore = 100;
    var amendedFinalScore = document.getElementById('final-score').value;
    if (amendedFinalScore >=100 && amendedFinalScore<=1000) {
        finalScore = amendedFinalScore;
    }    
    document.querySelector(".final-score").value = finalScore;
    
    // console.log(document.getElementById("radio two").checked);
    // console.log("finalScore = "+finalScore);

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    if (activePlayer) {
        document.querySelector('.player-0-panel').classList.remove('winner');
        document.querySelector('.player-0-panel').classList.remove('active');
    } else {
        document.querySelector('.player-1-panel').classList.remove('winner');
        document.querySelector('.player-1-panel').classList.remove('active');
    }    

    document.querySelector('.player-'+ activePlayer + '-panel').classList.add('active');
}



init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // 1. Random number
        var dice1 = Math.ceil(Math.random() * 6);
        // console.log("player "+ (activePlayer+1) +" rolled "+ dice1);
        var dice2 = Math.ceil(Math.random() * 6);
        // console.log("player "+ (activePlayer+1) +" rolled "+ dice2);

        //2. Display the result
        document.getElementById('dice-1').style.display='block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').style.display='block';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
        
        //3. Update the round score IF the rolled number was NOT a 1
        if (dice1 !== 1 && dice2!==1) {
            //Add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else if ( dice1===1 && dice2===1 ) {
            scores[activePlayer] = 0;
            document.getElementById('score-'+ activePlayer).textContent = 0;
            activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
            nextPlayer();            
        } else {
            //Next player
            activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
            nextPlayer();
        }        
    }    
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= finalScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
            nextPlayer();
        }
    }
});

function nextPlayer() {
    //Next player
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');    
}

document.querySelector('.btn-new').addEventListener('click', init);


/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 1 in a row ( single dice game),
   or double 1 ( double dice game ). 
   After that, it's the next player's turn. 
   (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, 
   so that they can change the predefined score of 100. 
   (Hint: you can read that value with the .value property in JavaScript. 
    This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. 
   The player looses his current score when one of them is a 1. 
   (Hint: you will need CSS to position the second dice, 
    so take a look at the CSS code for the first one.)
4. Flip the starting player.
*/

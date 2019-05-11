// Declaring arrays and using shuffle function to give casual orders to my cards //

//BoardGame arrays and variable
//var memory_array = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'L', 'L'];
var cardList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'L', 'M', 'N'];
var shuffled = [];
var memory_values = [];
var memory_card_ids = [];
var memory_array = [];
var card_flipped = 0;
var num_cards = 4;

//Variable for my scores  
var match = 0;
var click = 0;
var level = 0; //Set to 0 or my increment will set it to start from 1 level more
var score = [];
var scoreUser = 0;
var playerLevel = 0;
var sumCardMatch = 0;
var sumCardClick = 0;

//Variable for my timer
var second = 0,
    minute = 0;
var interval;

//Variable for random sentences on the Next Level Modal
var randomizedSentences = [];
var showedSentences = [];
var shuffledSentences = [];
var sentences = [
    "Is your brain on? Go haed! Don't lose time",
    'So you passed another level. Fair play to you!',
    'You can do it!',
    "You're on the bowl! Keep going.",
    "You passed another level, but don't be excited you are not a genius.",
];

//localStorage.clear(userName);

var userName = "Player";


function shuffle(arr) {
    var i = arr.length,
        j, temp;
    while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
}

// Get a random index between min and max
// from https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/* Starting Game function assignet to the start Button, clicking on this button the play the game will generate 4 
cards and the time will start counting, the pause button will appear instead of the play */

function startGame() {

    showBoardGame();

    newBoard(num_cards);
    startTimer();
    hideStartButton();
    document.getElementById("startBtn").onclick = function() { startGame(); };

}

function showBoardGame() {
    $("#startBtn").click(function() { $(".boardgame").show(); });
}


function hideStartButton() {
    $("#startBtn").css({ display: 'none' });
}

function showStartButton() {
    $("#startBtn").css({ display: '' });

}

//Function that allow the player to pause the game and show the play button 
function stopGame() {
    stopTimer();
    showStartButton();
    document.getElementById("pauseComandBtn").onclick = function() { stopGame(); };
}


// Function that will restart the sounds 
function startSounds() {
    $("#soundOnOffBtn").toggleClass('fas fa-volume-mute fas fa-volume-up');

}

//Function that change my sound button class on each click
function switchSoundClass() {
    $("#soundOnOffBtn").toggleClass('fas fa-volume-mute fas fa-volume-up');
    document.getElementById("soundOnOffBtn").onclick = function() { switchSoundClass() };
}


//..................................................................Game starting board//
function newBoard(num_cards) {

    console.log("the cards in the game are ==> " + num_cards); //testing console.log

    card_flipped = 0;
    var output = '';
    shuffled = [];

    for (var i = 0; i < num_cards / 2; i++) {
        // Get a random card between 0 and 11 from the card list
        var card = getRandomInt(0, 11);

        // Push the card into the list to be shuffled
        // We must push it twice to make sure it has a match
        shuffled.push(cardList[card]);
        shuffled.push(cardList[card]);
        console.log(shuffled);

    }
    shuffle(shuffled);

    console.log('shuffled ---> ', shuffled);

    for (var i = 0; i < shuffled.length; i++) {
        output += '<div class="backLogoCardDiv"  id="card_' + i + '" onclick="memoryFlipCard(this,\'' + shuffled[i] + '\')"></div>'
    }
    document.getElementById('boardgame').innerHTML = output;

    getRandomSentence(); // to generate a new sentence every round
}



/*....................................................Flip card function
It will assign an image value to the card and then it will check if my none of the cards are flipped
it will assign to the card i clicked the value */

function memoryFlipCard(card, val) {
    if (card.innerHTML == "" && memory_values.length < 2) {
        card.style.background = '#FFF';
        card.innerHTML = '<img id="imgCard" class="backImg" src="/assets/img/cards/' + val + '.png"/>'
        if (memory_values.length == 0) {
            totalClick();
            memory_values.push(val);
            memory_card_ids.push(card.id);
        }
        //function that will run only if i have a card flipped
        else if (memory_values.length == 1) {
            totalClick();
            memory_values.push(val);
            memory_card_ids.push(card.id);
            //And when i click another card it will add the value to the other card and it will check if it is a match
            if (memory_values[0] == memory_values[1]) {
                showMatch();
                card_flipped += 2;
                // If it is a match it will clear both arrays and the function can restart
                memory_values = [];
                memory_card_ids = [];
                // If all the card on the board are flipped then it generate a newboard  
                if (card_flipped == shuffled.length) {
                    document.getElementById('boardgame').innerHTML = "";
                    generateNewBoard();
                    levelUp();
                    totalScore();
                }
            }
            //If the id of the selected card is not the same then it will flip back the card assigning them my card logo 
            else {
                function flip2Back() {
                    // Flip the 2 cards back over
                    var card_1 = document.getElementById(memory_card_ids[0]);
                    var card_2 = document.getElementById(memory_card_ids[1]);
                    card_1.style.cssText = 'background: url(assets/img/backLogoCard.png) no repeat, background-size: cover';
                    card_1.innerHTML = "";
                    card_2.style.cssText = 'background: url(assets/img/backLogoCard.png) no repeat, background-size: cover';
                    card_2.innerHTML = "";
                    // Clear both arrays
                    memory_values = [];
                    memory_card_ids = [];
                }
                setTimeout(flip2Back, 500);
            }
        }
    }
}

function generateNewBoard() {
    if (level == 4) {
        stopTimer();
        num_cards = 4;
        $('#levelFiveModal').modal({ show: true });
        $('#nextLevelModal').modal('hide');
        startLevelFive();

    }
    if (playerLevel == 1) {
        stopTimer();
        $('#levelTwoModal').modal({ show: true });
        newBoard(num_cards + 4);

        num_cards += 4;
    }
    if (level != 1 && level != 4) {
        stopTimer();
        $('#nextLevelModal').modal({ show: true });
        newBoard(num_cards + 4);

        num_cards += 4;
    }
}

function startLevelFive() {
    $.getScript("/assets/js/trying.js", function() {
        levelFiveNewBoard();
        });
    // showCards(); to activate later
}


//On Page load modal 
function showOnLoadModal() {
    if (userName != "Player") {
        $(window).on('load', function() {
            $('#onLoadModal').modal('hide');
        });
    }
    if (userName === "Player") {
        $(window).on('load', function() {
            $('#onLoadModal').modal('show');
        });
    }
}


document.getElementById('timer').innerHTML = "Time: <br/>" + minute + " mins " + second + " secs";

function startTimer() {

    var timer = document.querySelector("#timer");

    interval = setInterval(function() {
        timer.innerHTML = "Time: <br/>" + minute + " mins " + second + " secs";
        second++;
        totalSecond = second;
        if (second == 60) {
            minute++;
            second = 0;
            totalMinute = minute;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
            totalHour = hour;
        }
    }, 1000);
}


/*function that will count the point the user does for each match ==> replace this function here and use it to value the totale times that the
user click on the card, then made another function that will remove the totalClick */
function showMatch(matchSum) {
    let cardMatched = ("Matches: " + match);
    if (memory_values[0] == memory_values[1]) {
        match++;
    }
    $('#matches').text(cardMatched);
    sumCardMatch = match;

    console.log(cardMatched);
}


function totalClick() {
    let cardClicked = ("Total Click: " + click);

    if (card_flipped >= 0) {
        click++;
    }
    $('#totalClick').text(cardClicked);
    sumCardClick = click;
    console.log(cardClicked);
}


//Function that will show the actual level 
function levelUp() {
    level++;
    $('#level').text("Level " + level);
    playerLevel = level;
    previousLevel = level - 1;
    $("#nextLevelModalTitle").text("Well Done, you passed the level " + previousLevel);

    console.log("player leves is " + level);
}


//Function that count the total score of the previous level and display it
function totalScore(total, num) {
    if (level != 1) {
        let levelPoints = ((sumCardMatch * sumCardMatch) / sumCardClick) * playerLevel; //Calculate the total score as total match + 20
        globalLevelPoint = levelPoints;
        console.log("The level score is: " + globalLevelPoint);
        score.push(globalLevelPoint); //create a new empty array where push my results, now i have to made the sum of them and show it
        total = score.reduce((acc, cur) => acc + cur, 0).toFixed(0); //taken from https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce

        document.getElementById('totalScore').innerHTML = ("Total Score: " + total);

    }
    else {
        document.getElementById('totalScore').innerHTML = "Total Score: " + 0;

    }
    //testing calculate the total score
    console.log("total is " + total);
}


//Function that will reset all the data
function dataReset() {

    resetTimer();

    match = 0;
    click = 0;

    var sumCardMatch = 0;
    var sumCardClick = 0;

    score = [];


    level = 0;

    totalScore(); //reset in first the total user score clling the function to fi=x the bug that my score goes up instead of setting to 0
    globalLevelPoint = 0;

    newBoard();
    num_cards = 4;

    localStorage.clear("userName");
    userName = "Player";
    displayPlayerName();
    store();

    totalClick();
    showMatch();
    levelUp();
    showStartButton();
    totalScore();
}

//Function that will reset the timer and prevent it starts again without clicking on the start
function resetTimer() {
    second = 0;
    minute = 0;
    stopTimer();
    timer.innerHTML = "Time: <br/>" + minute + " mins " + second + " secs";
}

// To prevent the timer to continue when the end levels modals are showed
function stopTimer() {
    clearInterval(interval);
}

//Function that allow the menu icon to change from "down" to "up" clicking on the Menu button 
function dropdownMenuIcon() {
    $("#menuDropdownBtn").toggleClass('fas fa-caret-down fas fa-caret-up');
}

//Function that will allow the reset confirm button to let reset the game
function resetGame() {
    document.getElementById("restartConfirm").onclick = function() { dataReset(); };
}

//Display a modal alert that will advise to the user that all the data are erased
function successAlert() {
    setTimeout(function() { $('#successAlertModal').modal('show') }, 500);
    setTimeout(function() { $('#successAlertModal').modal('hide') }, 2000);
}

/* I could use it as my final modal
//Validate if email for has been filled or not
function validateEmailForm() {
    name = document.getElementById("fullname");
    email = document.getElementById("emailaddress");
    text = document.getElementById("textarea");

    if (name == 'Name' && email == 'Email' && '' && text == 'Text here') {
        alert("Please fill all the areas!");
    }
}
*/

//function to get random sentences every level passed - function took from the following link: from https://stackoverflow.com/questions/33160766/generate-random-sentences-from-an-array-javascript
function getRandomSentence() {
    var randomSentences = sentences[Math.floor(Math.random() * sentences.length)];
    document.getElementById('endLevelSentences').innerHTML = randomSentences;
    console.log(randomSentences);
}

//User Details

// storing username from the starting modal
//User Details
var userName = localStorage.getItem("userName");

// storing username from the form input into the onload modal
function store() {
    if (userName == "Player") { //To prevent my name to change as default "Player" if the button to set the name is clicked
        userName = $("#username").val();
        localStorage.setItem("userName", userName);
    }
    console.log(userName); // testing console

}

//Assign to the p element the username chosen by the user
function displayPlayerName() {

    if (userName != "") {
        $('#playerName').text("Player: " + userName);
    }
    if (userName === null) {
        userName = "Player";
        $('#playerName').text("Player: " + userName);
    }
    else if (userName == "") {
        userName = "Player";
        $('#playerName').text("Player: " + userName);
    }
    console.log(userName); //testing console
}

//Show a success alert or an error alert if the player name is/ or is not inserted
function showAlertPlayerName() {
    if (userName != "Player") {
        $('#playerNameSuccess').show();
        setTimeout(function() { $('#playerNameSuccess').hide(); }, 1500);
    }
    if (userName == "Player") {
        $('#playerNameError').show();
        setTimeout(function() { $('#playerNameError').hide(); }, 1500);
    }
}

//To allow the player to change his name
function changePlayerName() {

    userName = $("#changeusername").val();
    localStorage.setItem("userName", userName);

    console.log(userName); // testing console

}

function showPlayerResults() {
    $('#playername').text("Player: " + userName);

}

newBoard(num_cards);
showBoardGame();
showMatch();
totalClick();
levelUp();
totalScore();
getRandomSentence();
displayPlayerName();
showOnLoadModal();
startLevelFive();

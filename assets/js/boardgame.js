// Declaring arrays and using shuffle function to give casual orders to my cards //

//BoardGame arrays and variable
var cardList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "L", "M", "N"];
var shuffled = [];
var memory_values = [];
var memory_card_ids = [];
var card_flipped = 0;
var num_cards = 4;

//Variable for my scores  
var match = 0;
var click = 0;
var level = 3; //Set to 0 or my increment will set it to start from 1 level more
var score = [];
var playerLevel = 0;
var scoreTotalLevelPoints = 0;
var scoreLevelPoints = 0;
var playerEndGameTotalScore = 0;
var totalMatchScore = 0;
var notMatchedScore = 1;
var noMatches = 1;
var cardMatched;
var playerClick = 0;


//Variable for my timer
var second = 0;
var minute = 0;
var interval;

//Variable for random sentences on the Next Level Modal
var sentences = [
    "Is your brain on? Go haed! Don't lose time",
    'So you passed another level. Fair play to you!',
    'You can do it!',
    "You're on the bowl! Keep going.",
    "You passed another level, but don't be excited you are not a genius."
];

var userName = "Player";

//Variable for audio
var matchSound = new Audio('/assets/sounds/Fuzzy Beep-SoundBible.com-1580329899.mp3');
var endGameSound = new Audio('/assets/sounds/Ta Da-SoundBible.com-1884170640.mp3');
var flipBackSound = new Audio('/assets/sounds/Pitch Baseball-SoundBible.com-868005975.mp3');
var endLevelSound = new Audio('/assets/sounds/Applause Light 2-SoundBible.com-356111200.mp3');
var resetSuccessSound = new Audio('/assets/sounds/277032__headphaze__ui-completed-status-alert-notification-sfx002.wav');
var startGameSound = new Audio('/assets/sounds/88550__movingplaid__pull-chain-02.wav');

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

function showBoardGame() {
    $("#startBtn").click(function() { $(".boardgame").show(); });
}

/* Starting Game function assignet to the start Button, clicking on this button the play the game will generate 4 
cards and the time will start counting, the pause button will appear instead of the play */
function startGame() {
    startTimer();
    showBoardGame();
    startGameSound.play();

    newBoard(num_cards);
}

function playPauseGame() {
    if ($('#startBtn').hasClass('fa-play')) {
        showBoardGame();
        startGame();
    }
    if ($('#startBtn').hasClass('fa-pause')) {
        stopGame();
    }
}

//Function that allow the player to pause the game and show the play button 
function stopGame() {
    stopTimer();
}

//Function that change my play button class on each click
function switchPlayBtnClass() {
    $("#startBtn").toggleClass('fas fa-play fas fa-pause');
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
        output += '<div class="backLogoCardDiv"  id="card_' + i + '" onclick="memoryFlipCard(this,\'' + shuffled[i] + '\')"></div>';
    }
    document.getElementById('boardgame').innerHTML = output;
    getRandomSentence(); // to generate a new sentence every round
}

/* Flip card function
 *It will assign an image value to the card and then it will check if my none of the cards are flipped
 *it will assign to the card i clicked the value 
 */
function memoryFlipCard(card, val) {
    if (card.innerHTML === "" && memory_values.length < 2) {
        card.style.background = '#FFF';
        card.innerHTML = '<img id="imgCard" class="backImg" src="/assets/img/cards/' + val + '.png"/>';
        if (memory_values.length === 0) {
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
                cardMatch();
                showMatch();
                matchSound.play();
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
                flipBackSound.play();
                setTimeout(flip2Back, 600);
            }
        }
    }
}

//Flip back the card if the selected card are not the same
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
    notMatchedScore++; //Every time the card flip back it add 1 point score that will give me the total score
    noMatches = notMatchedScore;
    console.log("not matched score is " + notMatchedScore); //testing console 
}

function generateNewBoard() {
    if (level > 1 && level < 4) {
        stopTimer();
        $('#nextLevelModal').modal({ show: true });
        newBoard(num_cards + 4);
        num_cards += 4;
        endLevelSound.play();
    }
    if (playerLevel === 1) {
        stopTimer();
        $('#levelTwoModal').modal({ show: true });
        newBoard(num_cards + 4);
        num_cards += 4;
        endLevelSound.play();
    }

    if (level == 4) {
        num_cards = 9;
        stopTimer();
        $.getScript("/assets/js/threecardsboard.js", function() {
            levelFiveBoard(num_cards);
        });
        $('#levelFiveModal').modal({ show: true });
        $('#nextLevelModal').modal('hide');
        endLevelSound.play();
    }
    if (level > 4 && level < 8) {
        stopTimer();
        $.getScript("/assets/js/threecardsboard.js", function() {
            levelFiveBoard(num_cards);
        });
        num_cards += 3;
        $('#nextLevelModal').modal({ show: true });
        $('#levelFiveModal').modal('hide');
        endLevelSound.play();
    }
    if (level == 8) {
        $('#totalMatchScore').text(userName + " score: " + playerEndGameTotalScore);
        $('#nextLevelModal').modal('hide');
        $('#winModal').modal({ show: true });

        stopTimer();
        endGame();
    }
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

function startOfGameTimeDisplay() {
    timer.innerHTML = "Time: <br/>" + "mins " + " : " + "secs";
}

function startTimer() {
    var timer = document.querySelector("#timer");
    interval = setInterval(function() {
        timer.innerHTML = "Time: <br/>" + minute + " : " + second + "";
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
    document.getElementById('timer').innerHTML = "Time: <br/>" + minute + " : " + second + "";
}

//Function that will reset the timer and prevent it starts again without clicking on the start
function resetTimer() {
    stopTimer();
    second = 0;
    minute = 0;
    timer.innerHTML = "Time: <br/>" + "mins " + " : " + "secs";
}

// To prevent the timer to continue when the end levels modals are showed
function stopTimer() {
    clearInterval(interval);
}

//Function that will increment the matches every time the user does a match
function cardMatch() {

    if (level >= 5) {
        for (i = 0; i < shuffled.length / num_cards; i++) {
            match++;
            scoreTotalLevelPoints += 5;
            totalMatchScore = scoreTotalLevelPoints;
        }
    }
    if (level > 0 && level < 5)
        for (i = 0; i < shuffled.length / num_cards; i++) {
            match++;
            scoreTotalLevelPoints += 5;
            totalMatchScore = scoreTotalLevelPoints;
        }
}

//function that will count the point the user does for each match 
function showMatch(matchSum) {
    let cardMatched = ("Matches: " + match);

    $('#matches').text(cardMatched);
    sumCardMatch = match;

    console.log(cardMatched);
}

function totalClick() {
    click++;
    playerClick = click;
    console.log("click " + click)
    showTotalClick();
}

function showTotalClick() {
    let cardClicked = ("Total Click: " + playerClick);

    $('#totalClick').text(cardClicked);
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

function totalScore(total) {
    if (level >= 1) {
        let levelPoints = level - 1;
        scoreLevelPoints = levelPoints;

        totalGameScore = (totalMatchScore + scoreLevelPoints) - (click + noMatches);

        console.log("The level score is" + scoreLevelPoints);
        console.log("the total matches score is " + totalMatchScore);
        score.push(totalGameScore); //create a new empty array where push my results, now i have to made the sum of them and show it
        total = score.reduce((acc, cur) => acc + cur, 0).toFixed(0); //taken from https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
        playerEndGameTotalScore = total;
        document.getElementById('totalScore').innerHTML = ("Total Score: " + total);
    }
    else {
        document.getElementById('totalScore').innerHTML = "Total Score: " + 0;
    }
    //testing calculate the total score
    console.log("total is " + playerEndGameTotalScore);
}

function storeScore() {
    score1 = playerEndGameTotalScore;
    localStorage.setItem("score1", score1);
}

function setScore() {
    var score1 = localStorage.getItem("score1");
    $('#score1').text(score1);
}

function endGame() {
    endGameSound.play();
    $('#nextLevelModal').modal('hide');
    num_cards = 0;
    stopGame();

    if (playerEndGameTotalScore >= 150 && playerEndGameTotalScore <= 250) {
        $("#endGameSentence").text("Congrats! Your memory is better than I thought!");
    }
    else if (playerEndGameTotalScore <= 100 && playerEndGameTotalScore >= 140) {
        $("#endGameSentence").text;
        $("#bestScoreEndGame").hide();
        $("#lowScoreEndGame").hide();
    }
    else if (playerEndGameTotalScore < 100) {
        $("#endGameSentence").text("OPS! You should do better than this, your memory is not good enough !");
        $("#bestScoreEndGame").hide();
        $("#midScoreEndGame").hide();
    }
}

//Function that will reset all the data
function dataReset() {

    resetTimer();
    stopTimer();

    match = 0;
    click = 0;

    score = [];
    notMatchedScore = 1;
    noMatches = 1;


    level = 0;

    scoreTotalLevelPoints = 0;

    newBoard();
    num_cards = 4;

    localStorage.clear("userName");
    userName = "Player";
    displayPlayerName();
    store();

    $('#startBtn').removeClass('fa-pause');
    $('#startBtn').addClass('fa-play');

    totalClick();
    showMatch();
    levelUp();
    totalScore();

    resetSuccessSound.play();
}

//Function that allow the menu icon to change from "down" to "up" clicking on the Menu button 
function dropdownMenuIcon() {
    $("#menuDropdownBtn").toggleClass('fas fa-caret-down fas fa-caret-up');
}

//Display a modal alert that will advise to the user that all the data are erased
function successAlert() {
    setTimeout(function() { $('#successAlertModal').modal('show') }, 500);
    setTimeout(function() { $('#successAlertModal').modal('hide') }, 2000);
}

//function to get random sentences every level passed - function took from the following link: from https://stackoverflow.com/questions/33160766/generate-random-sentences-from-an-array-javascript
function getRandomSentence() {
    var randomSentences = sentences[Math.floor(Math.random() * sentences.length)];
    document.getElementById('endLevelSentences').innerHTML = randomSentences;
    console.log(randomSentences);
}

// storing username from the starting modal
//User Details
var userName = localStorage.getItem("userName");

// storing username from the form input into the onload modal
function store() {
    userName = $("#username").val();
    localStorage.setItem("userName", userName);

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

//Show a success alert or an error alert if the player name is or is not inserted
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

//Show an alert in on onload modal for the username set or not set
function showAlertName() {
    if (userName != "Player") {
        $('#playerNameSuccess2').show();
        setTimeout(function() { $('#playerNameSuccess2').hide(); }, 1500);
    }
    if (userName == "Player") {
        $('#playerNameError2').show();
        setTimeout(function() { $('#playerNameError2').hide(); }, 1500);
    }
}

//Function that change my sound button class on each click
function switchSoundClass() {
    $("#soundOnOffBtn").toggleClass('fas fa-volume-mute fas fa-volume-up');
}

//Function that stop or restart the audio pending on the class of the button audio
function audioOnOff() {
    if ($('#soundOnOffBtn').hasClass('fa-volume-mute')) {
        audioOff();
    }
    if ($('#soundOnOffBtn').hasClass('fa-volume-up')) {
        audioOn();
    }
}

//Stop audio function
function audioOff() {
    endGameSound.muted = true;
    flipBackSound.muted = true;
    endLevelSound.muted = true;
    matchSound.muted = true;
    resetSuccessSound.muted = true;
    startGameSound.muted = true;
}

//Restart audio function
function audioOn() {
    endGameSound.muted = false;
    flipBackSound.muted = false;
    endLevelSound.muted = false;
    matchSound.muted = false;
    resetSuccessSound.muted = false;
    startGameSound.muted = false;
}

newBoard(num_cards);
showBoardGame();
levelUp();
showTotalClick();
showMatch();
totalScore();
getRandomSentence();
displayPlayerName();
showOnLoadModal();
setScore();
audioOnOff();
startOfGameTimeDisplay();

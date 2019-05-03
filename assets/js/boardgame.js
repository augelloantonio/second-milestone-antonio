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
var level = 1;
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
var sentences = [
    "Is your brain on? Go haed! Don't lose time",
    'So you passed another level. Fair play to you!',
    'You can do it!',
    "You're on the bowl! Keep going.",
    "You passed another level, but don't be excited you are not a genius.",
];

//Array.prototype.memory_card_shuffle = function() {
//  var i = this.length,
//    j, temp;
//while (--i > 0) {
//        j = Math.floor(Math.random() * (i + 1));
//        temp = this[j];
//        this[j] = this[i];
//        this[i] = temp;
//    }
//}


function memory_card_shuffle(arr) {
    var i = arr.length,
        j, temp;
    while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
}

// memory_card_shuffle(memory_array);




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


//................Starting Game BTN -- restarts game with 4 card less when pushed //

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
    $("#startBtn").css({ display: 'block' });

}



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
        // Get a random card between 0 and 7 from the card list
        var card = getRandomInt(0, 11);

        // Push the card into the list to be shuffled
        // We must push it twice to make sure it has a match
        shuffled.push(cardList[card]);
        shuffled.push(cardList[card]);
        console.log(shuffled);

    }
    memory_card_shuffle(shuffled);

    console.log('shuffled ---> ', shuffled);

    for (var i = 0; i < shuffled.length; i++) {
        output += '<div class="backLogoCardDiv"  id="card_' + i + '" onclick="memoryFlipCard(this,\'' + shuffled[i] + '\')"></div>'
    }
    document.getElementById('boardgame').innerHTML = output;
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
                    showLevel(level += 1);
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

//Loop that will let my num_cards add 4 new items each time until value of 16 reached (bug= it show 4 more card than my )
function generateNewBoard() {
    newBoard(num_cards + 4);
    //levelScore();
    if (num_cards >= 16) {
        stopTimer();
        $('#levelFiveModal').modal({ show: true });
        startLevelFive();
        num_cards = [];

    }
    else if (playerLevel == 1) {
        stopTimer();
        $('#levelTwoModal').modal({ show: true });
        num_cards += 4;
    }
    else {
        stopTimer();
        $('#nextLevelModal').modal({ show: true });
        num_cards += 4;
    }
}

function startLevelFive(card, val) {
    console.log("level 5 will start now");
    // showCards(); to activate later
}


//..............................................New function that allow to see the cards for 10 seconds //
/*
function showCards() {
    getElementByClass('.backLogoCardDiv.backImg');


    if (card_flipped == 0) {

    }
    setTimeout(function() { $("img").fadeOut(); }, 1000);
}
*/

/*On Page load modal 
$(window).on('load', function() {
    $('#onLoadModal').modal('show');
});
*/

//game timer


// Timer set to start when click first card (BUG = time go faster the double for each time the loop start again, so fo each level)

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


// Function that should stop the reloop of the startTimer function
function timeGaming() {

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
function showLevel() {
    let actualLevel = ("Level " + level);
    if (card_flipped == shuffled.length) {
        level++;
    }
    $('#level').text(actualLevel);
    playerLevel = level;
    console.log("player leves is " + actualLevel);

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


    level = 1;

    totalScore(); //reset in first the total user score clling the function to fi=x the bug that my score goes up instead of setting to 0
    globalLevelPoint = 0;

    newBoard();
    num_cards = 4;

    totalClick();
    showMatch();
    showLevel();
    showStartButton();
}

//Function that will reset the timer and prevent it starts again without clicking on the start
function resetTimer() {
    second = 0;
    minute = 0;
    stopTimer();
    timer.innerHTML = "Time: <br/>" + minute + " mins " + second + " secs";
}

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

//Display a modal alert that will advise to the user that the email has been sent
function successEmailAlert() {
    setTimeout(function() { $('#successEmailModal').modal('show') }, 500);
    setTimeout(function() { $('#successEmailModal').modal('hide') }, 2000);
}


//Reverse order for my element
//$('ul').append($('ul').find('li').get().reverse());


//Send email form
function sendMail(contactForm) {
    emailjs.send("outlook", "helpyourbrain", {
            "from_name": from_name_value,
            "from_email": from_email_value,
            "email_text": email_text_value
        })
        .then(
            function(response) {
                console.log("SUCCESS", response);
            },
            function(error) {
                console.log("FAILED", error);
            }
        );
    return false; // To block from loading a new page
}

//Validate if email for has been filled or not
function validateEmailForm() {
    name = document.getElementById("fullname");
    email = document.getElementById("emailaddress");
    text = document.getElementById("textarea");

    if (name == 'Name' && email == 'Email' && '' && text == 'Text here') {
        alert("Please fill all the areas!");
    }
}




//function to get random sentences every level passed - function took from the following link: from https://stackoverflow.com/questions/33160766/generate-random-sentences-from-an-array-javascript
function getRandomSentence() {
    var index = Math.floor(Math.random() * (sentences.length));
    return sentences[index];
}

function showRandomSentences() {
    var element = $("#endLevelSentences");
    var shuffledSentences = getRandomSentence();
    element.text(shuffledSentences);
}


newBoard(num_cards);
showBoardGame();
showMatch();
totalClick();
showLevel();
totalScore();
showRandomSentences();

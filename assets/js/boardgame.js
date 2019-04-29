// Declaring arrays and using shuffle function to give casual orders to my cards //

//var memory_array = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'L', 'L'];
var cardList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'L', 'M', 'N'];
var shuffled = [];
var memory_values = [];
var memory_card_ids = [];
var card_flipped = 0;
var num_cards = 4;
var match = 0;
var level = 1;
var click = 0;
var score = [];
var scoreUser = 0;
var playerLevel = 0;
var sumCardMatch = 0;
var sumCardClick = 0;

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

// function memory_card_shuffle(arr) {
//     var i = arr.length,
//         j, temp;
//     while (--i > 0) {
//         j = Math.floor(Math.random() * (i + 1));
//         temp = arr[j];
//         arr[j] = arr[i];
//         arr[i] = temp;
//     }
// }

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
    var x = document.getElementById("boardgame");
    if (x.style.display === "none") {
        x.style.display == "block";
    }
    document.getElementById("startBtn").onclick = function() { newBoard(num_cards) };
    startTimer();
    showBoardGame();
}

function showBoardGame() {
    $("#startBtn").click(function() { $(".boardgame").show(); });
}


// Function that will restart the sounds 
function startSounds() {

}

//Function that change my sound button class on each click
function switchSoundClass() {
    $("#soundOnOffBtn").toggleClass('fas fa-volume-mute fas fa-volume-up');
    document.getElementById("soundOnOffBtn").onclick = function() { switchSoundClass() };
}


//..................................................................Game starting board//
function newBoard(num_cards) {

    console.log(num_cards); //testing console.log

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

    shuffled.memory_card_shuffle();
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
                    totalScore()

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
        $('#levelFiveModal').modal({ show: true });
        startLevelFive();
        num_cards = [];

    }
    else {
        $('#levelTwoModal').modal({ show: true });
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

//On Page load modal 
$(window).on('load', function() {
    $('#onLoadModal').modal('show');
});


//game timer
var second = 0,
    minute = 0;
var timer = document.querySelector("#timer");
var interval;

// Timer set to start when click first card (BUG = time go faster the double for each time the loop start again, so fo each level)
function startTimer() {
    interval = setInterval(function() {
        timer.innerHTML = "Timer:" + minute + "mins " + second + "secs";
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
    console.log(actualLevel);
    playerLevel = level;
}


//Function that will count the total score of the previous level and display it
function totalScore(total, num) {
    //should give total score = total score at the start of the next level

    if (level != 1) {
        let levelPoints = (sumCardMatch / sumCardClick) + 10;
        globalLevelPoint = levelPoints;
        console.log("The level score is: " + globalLevelPoint);
        score.push(globalLevelPoint); //create a new empty array where push my results, now i have to made the sum of them and show it
        total = score.reduce((acc, cur) => acc + cur, 0); //taken from https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce

        document.getElementById('totalScore').innerHTML = ("Total Score: " + total);

    }
    else {
        document.getElementById('totalScore').innerHTML = "Total Score: " + 0;

    }
    //calculate the total score
    console.log("total is " + total);
}


function dataReset() {

    timeGaming();
    second = 0;
    minute = 0;

    showMatch();
    match = 0;

    totalClick();
    click = 0;

    showLevel();
    level = 1;

    totalScore();
    globalLevelPoint = 0;

    newBoard();
    num_cards = 4;


}


function resetGame() {
    document.getElementById("resetBtn").onclick = function() { dataReset() };
}


newBoard(num_cards);
showMatch();
totalClick()
showLevel();
totalScore();

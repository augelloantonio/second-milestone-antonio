// Declaring arrays and using shuffle function to give casual orders to my cards //

//var memory_array = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'L', 'L'];
var cardList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'L', 'M', 'N'];
var shuffled = [];
var memory_values = [];
var memory_card_ids = [];
var card_flipped = 0;
var num_cards = 4;
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
        x.style.display = "block";
    }
    document.getElementById("startBtn").onclick = function() { newBoard(num_cards) };
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
        //add <img id="imgCard" class="backImg" src="/assets/img/cards/' + shuffled[i] + '.png"/> between div to create img classthat will stay for each div
    }
    // memory_array.length = [num_cards];
    // memory_array.memory_card_shuffle();
    // for (var i = 0; i < memory_array.length; i++) {
    //     output += '<div  id="card_' + i + '" onclick="memoryFlipCard(this,\'' + memory_array[i] + '\')"></div>'
    // }
    document.getElementById('boardgame').innerHTML = output;
}

//.............................................................. To fix why the array's values after the length element are udefined//
//function levelTwoBoard() {
//$.getScript("/assets/js/levels/levelTwo.js", function() {});
//}


//....................................................Flip card function//
function memoryFlipCard(card, val) {
    if (card.innerHTML == "" && memory_values.length < 2) {
        card.style.background = '#FFF';
        //card.innerHTML = getElementById("imgCard");
        card.innerHTML = '<img id="imgCard" class="backImg" src="/assets/img/cards/' + val + '.png"/>'
        //setTimeout(function() { $("img").fadeOut(); }, 1000); //.............function that fade out my images working but on the image after clicking //
        if (memory_values.length == 0) {
            memory_values.push(val);
            memory_card_ids.push(card.id);
            // .............. setTimeout(function() { $(card).fadeOut(); }, 1000); // if here it delete my card (nice effect to do for next levels //
        }
        else if (memory_values.length == 1) {
            memory_values.push(val);
            memory_card_ids.push(card.id);
            if (memory_values[0] == memory_values[1]) {
                card_flipped += 2;
                // Clear both arrays
                memory_values = [];
                memory_card_ids = [];
                // Check to see if the whole board is cleared
                if (card_flipped == shuffled.length) {
                    document.getElementById('boardgame').innerHTML = "";
                    generateNewBoard();
                    // levelTwoBoard();
                } //--------------------------------------------------------Should I Stop this condition and start a new one?//
            }
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

//Loop that will let my num_cards add 4 new items each time until value of 16 reached
function generateNewBoard() {
    newBoard(num_cards + 4);
    if (num_cards === 8) {
    $('#levelFiveModal').modal({ show: true });
        startLevelFive();
    }
    else {
        $('#levelTwoModal').modal({show: true});
        num_cards += 4;
    }
}


function startLevelFive(card, val) {
    console.log("level 5 will start now");
    showCards();
}


//..............................................New function that allow to see the cards for 10 seconds //
function showCards() {
    getElementByClass('.backLogoCardDiv.backImg');
    
    
    if (card_flipped == 0){
        
    }
    setTimeout(function() { $("img").fadeOut(); }, 1000);
}


//On Page load modal 
$(window).on('load',function(){
        $('#onLoadModal').modal('show');
    });


//game timer
var second = 0,
    minute = 0;
var timer = document.querySelector(".timer");
var interval;

function startTimer() {
    interval = setInterval(function() {
        timer.innerHTML = minute + "mins " + second + "secs";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}

newBoard(num_cards);
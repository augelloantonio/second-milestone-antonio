var match = 0;

//..................................................................Game starting board//
function levelFiveBoard(num_cards) {

    console.log("the cards in the game are ==> " + num_cards); //testing console.log

    card_flipped = 0;
    var output = '';
    shuffled = [];

    for (var i = 0; i < num_cards / 3; i++) {
        // Get a random card between 0 and 11 from the card list
        var card = getRandomInt(0, 11);

        // Push the card into the list to be shuffled
        // We must push it twice to make sure it has a match
        shuffled.push(cardList[card]);
        shuffled.push(cardList[card]);
        shuffled.push(cardList[card]);

        console.log(shuffled);

    }
    shuffle(shuffled);

    console.log('shuffled ---> ', shuffled);

    for (var i = 0; i < shuffled.length; i++) {
        output += '<div class="backLogoCardDiv"  id="card_' + i + '" onclick="memoryFlipThreeCard(this,\'' + shuffled[i] + '\')"></div>'
    }
    document.getElementById('boardgame').innerHTML = output;

    getRandomSentence(); // to generate a new sentence every round
}



/*....................................................Flip card function
It will assign an image value to the card and then it will check if my none of the cards are flipped
it will assign to the card i clicked the value */

function memoryFlipThreeCard(card, val) {
    if (card.innerHTML == "" && memory_values.length < 3) {
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
        }
        else if (memory_values.length == 2) {
            totalClick();
            memory_values.push(val);
            memory_card_ids.push(card.id);
            //And when i click another card it will add the value to the other card and it will check if it is a match
            if (memory_values[0] === memory_values[1] && memory_values[1] === memory_values[2]) {
                showMatchLevelFive();
                card_flipped += 3;
                // If it is a match it will clear both arrays and the function can restart
                memory_values = [];
                memory_card_ids = [];
                // If all the card on the board are flipped then it generate a newboard  
                if (card_flipped == shuffled.length) {
                    document.getElementById('boardgame').innerHTML = "";
                    levelFiveNewBoard();
                    levelUp();
                    totalScore();
                }
            }
            //If the id of the selected card is not the same then it will flip back the card assigning them my card logo 
            else {
                function flip3Back() {
                    // Flip the 2 cards back over
                    var card_1 = document.getElementById(memory_card_ids[0]);
                    var card_2 = document.getElementById(memory_card_ids[1]);
                    var card_3 = document.getElementById(memory_card_ids[2]);
                    card_1.style.cssText = 'background: url(assets/img/backLogoCard.png) no repeat, background-size: cover';
                    card_1.innerHTML = "";
                    card_2.style.cssText = 'background: url(assets/img/backLogoCard.png) no repeat, background-size: cover';
                    card_2.innerHTML = "";
                    card_3.style.cssText = 'background: url(assets/img/backLogoCard.png) no repeat, background-size: cover';
                    card_3.innerHTML = "";
                    // Clear both arrays
                    memory_values = [];
                    memory_card_ids = [];
                }
                setTimeout(flip3Back, 500);
            }
        }
    }
}

function showMatchLevelFive(matchSum) {
    let cardMatched = ("Matches: " + match);
    //if (areEqual(memory_values[0], memory_values[1], memory_values[2])) {
    if (memory_values[0] === memory_values[1] && memory_values[1] === memory_values[2]) {
        match++;
    }
    $('#matches').text(cardMatched);
    sumCardMatch = match;

    console.log(cardMatched);
}

function areEqual() {
    var len = arguments.length;
    for (var i = 1; i < len; i++) {
        if (arguments[i] === null || arguments[i] !== arguments[i - 1])
            return false;
    }
    return true;
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

function levelFiveNewBoard() {
    if (level >= 5) {
        stopTimer();
        num_cards = 9;
        $('#levelFiveModal').modal({ show: true });
        $('#nextLevelModal').modal('hide');
        levelFiveBoard(num_cards)
    }
    else if (level > 5) {
        levelFiveBoard(num_cards + 9)
        $('#nextLevelModal').modal('show');
        num_cards += 3;
    }
}


showMatchLevelFive();

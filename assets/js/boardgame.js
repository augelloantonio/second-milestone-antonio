var memory_array = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'L', 'L'];
var memory_values = [];
var memory_card_ids = [];
var card_flipped = 0;
Array.prototype.memory_card_shuffle = function() {
    var i = this.length,
        j, temp;
    while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

//.................................Starting Game BTN//
function startGame() {
    var x = document.getElementById("boardgame");
    if (x.style.display === "none") {
        x.style.display = "block";
    }
    document.getElementById("startBtn").onclick = function() { newBoard()};
    document.getElementById("boardgame").style.display = "block";
}


//...........................................Game starting board//
    function newBoard() {
        card_flipped = 0;
        var output = '';
        memory_array.length = [4]; // Rememnber to change this value!!//
        memory_array.memory_card_shuffle();
        for (var i = 0; i < memory_array.length; i++) {
            output += '<div id="card_' + i + '" onclick="memoryFlipCard(this,\'' + memory_array[i] + '\')"></div>';
        }
        document.getElementById('boardgame').innerHTML = output;
    }

    function levelTwoBoard() {
        var memory_array = newMemoryArray;
        card_flipped = 0;
        var output = '';
        memory_array.length = [18];
        memory_array.memory_card_shuffle();
        for (var i = 0; i < memory_array.length; i++) {
            output += '<div id="card_' + i + '" onclick="memoryFlipCard(this,\'' + memory_array[i] + '\')"></div>';
        }
        document.getElementById('boardgame').innerHTML = output;
    }

    function levelThreeBoard() {
        card_flipped = 0;
        var output = '';
        var i = [0];
        memory_array.length = [16];
        memory_array.memory_card_shuffle();
        for (var i = 0; i < memory_array.length; i++) {
            output += '<div id="card_' + i + '" onclick="memoryFlipCard(this,\'' + memory_array[i] + '\')"></div>';
        }
        document.getElementById('boardgame').innerHTML = output;
    }

    function memoryFlipCard(card, val) {

        if (card.innerHTML == "" && memory_values.length < 2) {
            card.style.background = '#FFF';
            card.innerHTML = val;
            if (memory_values.length == 0) {
                memory_values.push(val);
                memory_card_ids.push(card.id);
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
                    if (card_flipped == memory_array.length) {
                        alert("Well done! Level Two Starting!");
                        document.getElementById('boardgame').innerHTML = "";
                        levelTwoBoard();
                    }
                    if (card_flipped == memory_array.length) {
                        alert("Well done! Level Three Starting!");
                        document.getElementById('boardgame').innerHTML = "";
                        levelThreeBoard();
                    }
                    if (card_flipped == memory_array.length) {
                        alert("WIN!");
                        document.getElementById('boardgame').innerHTML = "";
                        levelThreeBoard();
                    }
                }
                else {
                    function flip2Back() {
                        // Flip the 2 cards back over
                        var card_1 = document.getElementById(memory_card_ids[0]);
                        var card_2 = document.getElementById(memory_card_ids[1]);
                        card_1.style.cssText = 'background: url(/assets/img/card.jpg) no repeat, background-size: cover';
                        card_1.innerHTML = "";
                        card_2.style.cssText = 'background: url(/assets/img/card.jpg) no repeat, background-size: cover';
                        card_2.innerHTML = "";
                        // Clear both arrays
                        memory_values = [];
                        memory_card_ids = [];
                    }
                    setTimeout(flip2Back, 700);
                }
            }
        }


    }

    window.addEventListener(newBoard());
    window.addEventListener(levelTwoBoard());
    window.addEventListener(levelThreeBoard());

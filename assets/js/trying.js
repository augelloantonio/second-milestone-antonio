function gameLoad() {
    if (memory_array.length <= 12) {
        newBoard();

    }
    else if (memory_array.length <= 16) {
        levelTwoBoard();
    }
    else {
        levelThreeBoard();
    }
}


//.................................Starting Game BTN//
function startGame() {
    var x = document.getElementById("boardgame");
    if (x.style.display === "none") {
        x.style.display = "block";
    }
    document.getElementById("startBtn").onclick = function() { newBoard()};
    document.getElementById("loadGame").style.display = "block";
}

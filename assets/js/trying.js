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
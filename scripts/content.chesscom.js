// Collect data
const moves = document.getElementsByClassName('move-list-row');
let result = moves[moves.length - 1].getElementsByTagName('span')[0].innerText;

let pgn = '';

for (let i = 0; i < moves.length - 1; i++) {
    move_number = (i + 1) + '.';
    white_move = moves[i].getElementsByTagName('span')[0].innerText;
    try {
        black_move = moves[i].getElementsByTagName('span')[1].innerText;
    } catch (error) {
        black_move = null;
    }

    if (black_move === null) {
        pgn += move_number + ' ' + white_move + ' ';
    } else {
        pgn += move_number + ' ' + white_move + ' ' + black_move + ' ';
    }
}

pgn += result;

// Send to background script
chrome.runtime.sendMessage({
    action: "dataCollected",
    data: pgn,
    targetUrl: "https://chess.wintrcat.uk"
});
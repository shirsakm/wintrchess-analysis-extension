chrome.storage.local.get(['pgn'], (result) => {
    const data = result.pgn;
    const pgnTextArea = document.getElementById('pgn');
    pgnTextArea.value = data;
});
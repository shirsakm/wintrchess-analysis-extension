// Navigate to PGN tab
const shareBtn = document.querySelector(".share");
shareBtn.click();

const pgnTab = document.querySelector(".share-menu-tab-selector-tab");
pgnTab.click();

// Extract PGN
const pgn = document.querySelector(".share-menu-tab-pgn-textarea").value;


// Send to background script
chrome.runtime.sendMessage({
    action: "dataCollected",
    data: pgn,
    targetUrl: "https://chess.wintrcat.uk"
});
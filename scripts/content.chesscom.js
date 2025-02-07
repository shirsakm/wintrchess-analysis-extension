// Navigate to PGN tab
const shareBtn = document.querySelector(".share");
shareBtn.click();

waitForElm('.share-menu-tab-selector-tab').then((elm) => {
    let pgnTab = elm;
    pgnTab.click();
});

// Extract PGN
let pgn;
waitForElm('.share-menu-tab-pgn-textarea').then((elm) => {
    pgn = elm.value;

    // Send to background script
    chrome.runtime.sendMessage({
        action: "dataCollected",
        data: pgn,
        targetUrl: "https://chess.wintrcat.uk"
    });
});

// Function to wait for an element to appear in the DOM
function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector) !== null && document.querySelector(selector) !== undefined) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector) !== null && document.querySelector(selector) !== undefined) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}
chrome.action.onClicked.addListener(async (tab) => {
    // Only activate if on chess.com
    if (tab.url.includes("chess.com")) {
        // Inject content script into current tab
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['scripts/content.chesscom.js']
        });

        console.log("Data extraction started!");
    } else {
        console.log("This only works on Website 1!");
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "dataCollected") {
        // Store data temporarily
        chrome.storage.local.set({ pgn: message.data });

        // Open FreeChess website
        chrome.tabs.create({ url: message.targetUrl }, (newTab) => {
            // Inject PGN into FreeChess website when loaded
            chrome.scripting.executeScript({
                target: { tabId: newTab.id },
                files: ['scripts/content.freechess.js']
            });
        });
    }
});
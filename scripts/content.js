chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "alertOffTopic") {
        alert("Focus Search: your search may be off topic!");
    }
});
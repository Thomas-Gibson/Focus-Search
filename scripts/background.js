chrome.webNavigation.onBeforeNavigate.addListener(function (details) {

    // Retrieve the saved options from chrome.storage.sync
    chrome.storage.sync.get(["strictnessMode", "keywords"], function (data) {
        var strictnessMode = data.strictnessMode;
        var keywords = data.keywords;

        // Check if the URL is a search engine result page
        if (details.url.includes("search?") && keywords) {
            // Get the search query from the URL
            var queryParam = new URL(details.url).searchParams.get("q");

            if (queryParam) {
                var searchQuery = queryParam.toLowerCase();

                // Check if any keyword is present in the search query
                var keywordFound = keywords.some(keyword => searchQuery.includes(keyword));

                if (!keywordFound) {
                    // Redirect to Google if no keyword is found in the search query


                    if (strictnessMode == 1) {
                        chrome.webNavigation.onCompleted.addListener(function (details) {
                            // Check if the URL is a search engine result page

                            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                                chrome.tabs.sendMessage(tabs[0].id, { action: "alertOffTopic" });
                            });
                        });
                    }
                    else if (strictnessMode == 2) {
                        chrome.tabs.update(details.tabId, { url: "https://www.google.com/" });
                    }
                }
            }
        }
    });
});

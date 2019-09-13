chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher()],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

/*

const xhr = new XMLHttpRequest();

xhr.open("GET", "http://localhost/~danilrayanov/", true);

xhr.onload = function(){
    const matches = xhr.responseText;
};

xhr.send();
*/

import { SHOW_APP } from "./actions";

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {
              hostEquals: "app.clubhouse.io"
            }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});

chrome.pageAction.onClicked.addListener(tab => {
  chrome.tabs.sendMessage(tab.id, { type: SHOW_APP });
});

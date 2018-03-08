import "../img/icon16.png";
import "../img/icon48.png";
import "../img/icon128.png";

// This is the tab that has Clubhouse running -- the page needs to call "init"
// to set this value
let tabId = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.command) {
    case "init":
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        tabId = tabs[0].id;
        console.log("init from tabId", tabId);
      });
      break;

    case "auth":
      sendResponse({ message: "requesting token" });
      chrome.identity.getAuthToken({ interactive: true }, token => {
        chrome.tabs.sendMessage(tabId, { message: `token: ${token}` });
      });
      break;

    case "list":
      sendResponse({ message: "requesting spreadsheets" });
      chrome.identity.getAuthToken({ interactive: false }, token => {
        const headers = new Headers({
          Authorization: `Bearer ${token}`
        });
        const query = "mimeType = 'application/vnd.google-apps.spreadsheet'";
        const q = encodeURIComponent(query);
        fetch(`https://www.googleapis.com/drive/v3/files?q=${q}`, {
          headers
        })
          .then(response => response.json())
          .then(data => chrome.tabs.sendMessage(tabId, data));
      });
      break;

    case "load":
      const docId = "1L-bymAPujx1r_lLysKTNOiD7qdvxWeS8WSrcHxXeiTk";
      sendResponse({ message: "loading hardcoded spreadsheet" });
      chrome.identity.getAuthToken({ interactive: false }, token => {
        const headers = new Headers({
          Authorization: `Bearer ${token}`
        });
        const range = "B2:F10";
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${docId}/values/${range}`;
        fetch(url, { headers })
          .then(response => response.json())
          .then(data => chrome.tabs.sendMessage(tabId, data));
      });
      break;

    default:
      sendResponse({ message: "hello from the background" });
  }
});

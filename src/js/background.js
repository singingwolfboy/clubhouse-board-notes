import "../img/icon16.png";
import "../img/icon48.png";
import "../img/icon128.png";

import "./pageAction";
import {
  INIT,
  LOG_IN,
  LOG_OUT,
  SPREADSHEET_REQ_START,
  SPREADSHEET_REQ_SUCCESS,
  LIST_REQ_START,
  LIST_REQ_SUCCESS
} from "./actions";

// This is the tab that has Clubhouse running -- the page needs to call "init"
// to set this value
let tabId = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.command) {
    case INIT:
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        tabId = tabs[0].id;
        console.log("init from tabId", tabId);

        chrome.identity.getAuthToken({ interactive: false }, token => {
          chrome.tabs.sendMessage(tabId, {
            type: token ? LOG_IN : LOG_OUT
          });
        });
      });
      break;

    case LOG_IN:
      sendResponse({ message: "requesting token" });
      chrome.identity.getAuthToken({ interactive: true }, token => {
        chrome.tabs.sendMessage(tabId, {
          type: token ? LOG_IN : LOG_OUT
        });
      });
      break;

    case LOG_OUT:
      sendResponse({ message: "clearing token" });
      chrome.identity.getAuthToken({ interactive: false }, token => {
        chrome.identity.removeCachedAuthToken({ token }, () => {
          chrome.tabs.sendMessage(tabId, {
            type: LOG_OUT
          });
        });
      });
      break;

    case LIST_REQ_START:
      sendResponse({ message: "requesting spreadsheets" });
      chrome.identity.getAuthToken({ interactive: false }, token => {
        if (!token) {
          chrome.tabs.sendMessage(tabId, { type: LOG_OUT });
          return;
        }

        chrome.tabs.sendMessage(tabId, { type: LIST_REQ_START });
        const headers = new Headers({
          Authorization: `Bearer ${token}`
        });
        const query = "mimeType = 'application/vnd.google-apps.spreadsheet'";
        const q = encodeURIComponent(query);
        fetch(`https://www.googleapis.com/drive/v3/files?q=${q}`, {
          headers
        })
          .then(response => response.json())
          .then(data =>
            chrome.tabs.sendMessage(tabId, { type: LIST_REQ_SUCCESS, data })
          );
      });
      break;

    case SPREADSHEET_REQ_START:
      const docId = "1L-bymAPujx1r_lLysKTNOiD7qdvxWeS8WSrcHxXeiTk";
      sendResponse({ message: "loading hardcoded spreadsheet" });
      chrome.identity.getAuthToken({ interactive: false }, token => {
        if (!token) {
          chrome.tabs.sendMessage(tabId, { type: LOG_OUT });
          return;
        }

        chrome.tabs.sendMessage(tabId, { type: SPREADSHEET_REQ_START });
        const headers = new Headers({
          Authorization: `Bearer ${token}`
        });
        const range = "B2:F100";
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${docId}/values/${range}`;
        fetch(url, { headers })
          .then(response => response.json())
          .then(data =>
            chrome.tabs.sendMessage(tabId, {
              type: SPREADSHEET_REQ_SUCCESS,
              data
            })
          );
      });
      break;

    default:
      console.warn("Received an unknown request", request);
  }
});

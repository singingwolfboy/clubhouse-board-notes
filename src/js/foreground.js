import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { createStore } from "redux";
import App from "./App";
import reducer from "./reducer";
import {
  LOG_IN,
  LOG_OUT,
  SPREADSHEET_REQ_START,
  SPREADSHEET_REQ_SUCCESS
} from "./actions";

const store = createStore(reducer);

const contentIsLoaded = content => {
  const el = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    el
  );

  content.appendChild(el);
};

const checkForContent = () => {
  const content = document.querySelector("#content");
  if (content) {
    contentIsLoaded(content);
  } else {
    setTimeout(checkForContent, 100);
  }
};

checkForContent();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  store.dispatch(request);
});

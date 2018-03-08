import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const NotesContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  background: white;
  border-top: 1px solid #ccc;
`;

class App extends React.Component {
  componentDidMount() {
    chrome.runtime.sendMessage({ command: "init" });
  }

  handleAuthClick = event => {
    chrome.runtime.sendMessage({ command: "auth" }, response => {
      if (response) {
        console.log("message from backend:", response.message);
      } else {
        console.error("oops, no message");
      }
    })
  };

  handleListClick = event => {
    chrome.runtime.sendMessage({ command: "list" }, response => {
      if (response) {
        console.log("message from backend:", response.message);
      } else {
        console.error("oops, no message");
      }
    })
  };

  handleLoadClick = event => {
    chrome.runtime.sendMessage({ command: "load" }, response => {
      if (response) {
        console.log("message from backend:", response.message);
      } else {
        console.error("oops, no message");
      }
    })
  };

  render() {
    return (
      <NotesContainer>
        <button onClick={this.handleAuthClick}>Auth</button>
        <button onClick={this.handleListClick}>List</button>
        <button onClick={this.handleLoadClick}>Load</button>
      </NotesContainer>
    );
  }
}

const contentIsLoaded = (content) => {
  const el = document.createElement("div");
  ReactDOM.render(<App />, el);
  content.appendChild(el);
}

const checkForContent = () => {
  const content = document.querySelector("#content");
  if (content) {
    contentIsLoaded(content);
  } else {
    setTimeout(checkForContent, 100);
  }
}

checkForContent();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("message from backend:", request);
})

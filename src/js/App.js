import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import Spreadsheet from "./Spreadsheet";

const NotesContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  background: white;
  border-top: 1px solid #ccc;
`;

class App extends React.Component {
  static propTypes = {
    authenticated: PropTypes.bool
  };

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
    });
  };

  handleListClick = event => {
    chrome.runtime.sendMessage({ command: "list" }, response => {
      if (response) {
        console.log("message from backend:", response.message);
      } else {
        console.error("oops, no message");
      }
    });
  };

  handleLoadClick = event => {
    chrome.runtime.sendMessage({ command: "load" }, response => {
      if (response) {
        console.log("message from backend:", response.message);
      } else {
        console.error("oops, no message");
      }
    });
  };

  handleLogOutClick = event => {
    chrome.runtime.sendMessage({ command: "clear" }, response => {
      if (response) {
        console.log("message from backend:", response.message);
      } else {
        console.error("oops, no message");
      }
    });
  };

  render() {
    const { authenticated } = this.props;

    let body = null;
    if (authenticated) {
      body = (
        <div>
          <Spreadsheet />
          <button onClick={this.handleLogOutClick}>Log Out</button>
        </div>
      );
    } else {
      body = (
        <div>
          You need to authenticate with Google, so we can load your notes.
          <button onClick={this.handleAuthClick}>Log In</button>
        </div>
      );
    }
    return (
      <NotesContainer>
        {body}
      </NotesContainer>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.authenticated
});

export default connect(mapStateToProps)(App);

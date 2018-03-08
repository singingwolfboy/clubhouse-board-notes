import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
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
  static propTypes = {
    authenticated: PropTypes.bool,
  }

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

  handleClearClick = event => {
    chrome.runtime.sendMessage({ command: "clear" }, response => {
      if (response) {
        console.log("message from backend:", response.message);
      } else {
        console.error("oops, no message");
      }
    })
  };

  render() {
    const { authenticated } = this.props;
    return (
      <NotesContainer>
        <div>Authenticated: {authenticated ? "Yes" : "No"}</div>
        <button onClick={this.handleAuthClick}>Auth</button>
        <button onClick={this.handleListClick}>List</button>
        <button onClick={this.handleLoadClick}>Load</button>
        <button onClick={this.handleClearClick}>Clear Auth</button>
      </NotesContainer>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.authenticated
})

export default connect(mapStateToProps)(App);

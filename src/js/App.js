import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import Spreadsheet from "./Spreadsheet";
import { INIT, LOG_IN, LOG_OUT } from "./actions";
import MenuButton from "./MenuButton";

const NotesContainer = styled.div`
  position: absolute;
  bottom: 0;
  height: 100px;
  min-width: 200px;
  background: white;
  border-top: 1px solid #ccc;
  overflow: auto;
`;

class App extends React.Component {
  static propTypes = {
    authenticated: PropTypes.bool
  };

  componentDidMount() {
    chrome.runtime.sendMessage({ command: INIT });
  }

  handleLogIn = event => {
    chrome.runtime.sendMessage({ command: LOG_IN }, response => {
      if (response) {
        console.log("message from backend:", response.message);
      }
    });
  };

  handleLogOut = event => {
    chrome.runtime.sendMessage({ command: LOG_OUT }, response => {
      if (response) {
        console.log("message from backend:", response.message);
      }
    });
  };

  renderLoggedIn() {
    return (
      <React.Fragment>
        <Spreadsheet />
        <MenuButton />
      </React.Fragment>
    );
  }

  renderLoggedOut() {
    return (
      <React.Fragment>
        You need to authenticate with Google, so we can load your notes.
        <button onClick={this.handleLogIn}>Log In</button>
      </React.Fragment>
    );
  }

  render() {
    const { authenticated } = this.props;
    return (
      <NotesContainer>
        {authenticated ? this.renderLoggedIn() : this.renderLoggedOut()}
      </NotesContainer>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.authenticated
});

export default connect(mapStateToProps)(App);

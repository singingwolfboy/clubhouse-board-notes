import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import Spreadsheet from "./Spreadsheet";
import { INIT, LOG_IN, LOG_OUT } from "./actions";
import MenuButton from "./MenuButton";
import CloseButton from "./CloseButton";

const NotesContainer = styled.div`
  position: absolute;
  bottom: 0;
  height: ${({ authenticated }) => authenticated ? "100px" : "25px"};
  min-width: 200px;
  width: calc(100% - ${props => props.reduceWidth});
  background: white;
  border-top: 1px solid #ccc;
  overflow: auto;
`;

const Padding = styled.span`
  padding: 0 10px;
`;

class App extends React.Component {
  static propTypes = {
    show: PropTypes.bool,
    authenticated: PropTypes.bool
  };

  state = {
    contentMargin: undefined
  };

  componentDidMount() {
    chrome.runtime.sendMessage({ command: INIT });

    if (window.ResizeObserver) {
      // only in Chrome 64 and above
      const content = document.querySelector("#content");
      const ro = new ResizeObserver(entries => {
        const entry = entries[0].target;
        this.setState({ contentMargin: getComputedStyle(entry).marginLeft });
      });
      ro.observe(content);
      this.setState({ contentMargin: getComputedStyle(content).marginLeft });
    } else {
      // fallback for Chrome 63 and below
      this.setState({ contentMargin: "284px" });
    }
  }

  handleLogIn = event => {
    chrome.runtime.sendMessage({ command: LOG_IN }, response => {
      if (response) {
        // console.log("message from backend:", response.message);
      }
    });
  };

  handleLogOut = event => {
    chrome.runtime.sendMessage({ command: LOG_OUT }, response => {
      if (response) {
        // console.log("message from backend:", response.message);
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
    const { authenticated } = this.props;
    return (
      <Padding>
        You need to authenticate with Google, so we can load your notes.
        <Padding>
          <button onClick={this.handleLogIn}>Log In</button>
        </Padding>
        {authenticated ? <MenuButton /> : <CloseButton />}
      </Padding>
    );
  }

  render() {
    const { show, authenticated } = this.props;
    if (!show) {
      return null;
    }

    return (
      <NotesContainer
        reduceWidth={this.state.contentMargin}
        authenticated={authenticated}
      >
        {authenticated ? this.renderLoggedIn() : this.renderLoggedOut()}
      </NotesContainer>
    );
  }
}

const mapStateToProps = state => ({
  show: state.showApp,
  authenticated: state.authenticated
});

export default connect(mapStateToProps)(App);

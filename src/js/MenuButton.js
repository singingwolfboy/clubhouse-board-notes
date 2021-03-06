import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import { Manager, Target, Popper } from "react-popper";
import { LOG_OUT, HIDE_APP, SPREADSHEET_REQ_START } from "./actions";
import VerticalDots from "../img/vertical-dots.svg";

export const Button = styled.button`
  position: absolute;
  top: 2px;
  right: 2px;
  background-color: #ccc;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  color: #fff;

  &:focus {
    overflow: hidden;
  }

  > svg {
    fill: #fff;
    margin-left: -8px;
    margin-top: -2px;
  }
`;

const Menu = styled.ul`
  background-color: #fff;
  border: 1px solid black;
  border-radius: 2px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  padding: 2px;

  &:hover {
    background-color: #ddd;
  }
`;

class MenuButton extends React.Component {
  static propTypes = {
    authenticated: PropTypes.bool,
    onCloseAction: PropTypes.func
  };

  state = {
    showMenu: false
  };

  toggleMenu = () =>
    this.setState(prevState => ({ showMenu: !prevState.showMenu }));

  handleReloadAction = () => {
    chrome.runtime.sendMessage({ command: SPREADSHEET_REQ_START }, response => {
      if (response) {
        // console.log("message from backend:", response.message);
      }
      this.setState({ showMenu: false });
    });
  };

  handleCloseAction = () => {
    this.props.onCloseAction();
    this.setState({ showMenu: false });
  };

  handleLogOutAction = () => {
    chrome.runtime.sendMessage({ command: LOG_OUT }, response => {
      if (response) {
        // console.log("message from backend:", response.message);
      }
      this.setState({ showMenu: false });
    });
  };

  renderMenu() {
    const { authenticated } = this.props;
    return (
      <Menu>
        <MenuItem onClick={this.handleCloseAction}>Close</MenuItem>
        {authenticated && (
          <MenuItem onClick={this.handleReloadAction}>Reload</MenuItem>
        )}
        {authenticated && (
          <MenuItem onClick={this.handleLogOutAction}>Log out</MenuItem>
        )}
      </Menu>
    );
  }

  render() {
    const { showMenu } = this.state;

    return (
      <Manager>
        <Target>
          <Button onClick={this.toggleMenu}>
            <VerticalDots />
          </Button>
        </Target>
        {showMenu && (
          <Popper placement="bottom-end">{this.renderMenu()}</Popper>
        )}
      </Manager>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.authenticated
});

const mapDispatchToProps = dispatch => ({
  onCloseAction: () => dispatch({ type: HIDE_APP })
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuButton);

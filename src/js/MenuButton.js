import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import { Manager, Target, Popper } from "react-popper";
import { INIT, LOG_IN, LOG_OUT, HIDE_APP } from "./actions";
import VerticalDots from "../img/vertical-dots.svg";

const Button = styled.button`
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
  list-style: none;
  padding: 2px;
`;

const MenuItem = styled.li`
  padding: 2px;

  &:hover {
    background-color: #ddd;
  }
`;

class MenuButton extends React.Component {
  static propTypes = {
    onCloseAction: PropTypes.func,
  };

  state = {
    showMenu: false
  };

  toggleMenu = () =>
    this.setState(prevState => ({ showMenu: !prevState.showMenu }));

  handleCloseAction = () => {
    this.props.onCloseAction();
    this.setState({ showMenu: false });
  };

  handleLogOutAction = () => {
    chrome.runtime.sendMessage({ command: LOG_OUT }, response => {
      if (response) {
        console.log("message from backend:", response.message);
      }
      this.setState({ showMenu: false });
    });
  };

  renderMenu() {
    return (
      <Menu>
        <MenuItem onClick={this.handleCloseAction}>Close</MenuItem>
        <MenuItem onClick={this.handleLogOutAction}>Log out</MenuItem>
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

const mapDispatchToProps = dispatch => ({
  onCloseAction: () => dispatch({ type: HIDE_APP }),
});

export default connect(null, mapDispatchToProps)(MenuButton);

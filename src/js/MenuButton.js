import React from "react";
import styled from "styled-components";
import { INIT, LOG_IN, LOG_OUT } from "./actions";
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

  > svg {
    fill: #fff;
    margin-left: -8px;
    margin-top: -2px;
  }
`;

class MenuButton extends React.Component {
  render() {
    return (
      <Button><VerticalDots /></Button>
    );
  }
}

export default MenuButton;

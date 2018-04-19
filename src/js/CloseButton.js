import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { HIDE_APP } from "./actions";
import Cross from "../img/cross.svg";
import { Button } from "./MenuButton";

const CloseButton = ({ onCloseAction }) =>
  <Button onClick={onCloseAction}>
    <Cross />
  </Button>

const mapDispatchToProps = dispatch => ({
  onCloseAction: () => dispatch({ type: HIDE_APP })
});

export default connect(null, mapDispatchToProps)(CloseButton);

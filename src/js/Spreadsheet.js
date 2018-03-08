import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import { SPREADSHEET_REQ_START } from "./actions";

class Spreadsheet extends React.Component {
  static propTypes = {
    loading: PropTypes.bool,
    rows: PropTypes.array
  };

  componentWillMount() {
    chrome.runtime.sendMessage({ command: SPREADSHEET_REQ_START }, response => {
      if (response) {
        console.log("message from backend:", response.message);
      }
    });
  }

  render() {
    const { loading, rows } = this.props;
    if (loading) {
      return "loading spreadsheet";
    }
    return (
      <table>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((col, cindex) => <td key={cindex}>{col}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = state => ({
  rows: state.rows,
  loading: state.loading
});

export default connect(mapStateToProps)(Spreadsheet);

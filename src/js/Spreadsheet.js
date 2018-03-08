import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";

class Spreadsheet extends React.Component {
  static propTypes = {
    loading: PropTypes.bool,
    rows: PropTypes.array
  };

  componentWillMount() {
    chrome.runtime.sendMessage({ command: "load" }, response => {
      if (response) {
        console.log("message from backend:", response.message);
      } else {
        console.error("oops, no message");
      }
    });
  }

  render() {
    const { loading, rows } = this.props;
    if (loading) {
      return "loading spreadsheet";
    }
    return (
      <div>
        <table>
          {rows.map(row => <tr>{row.map(col => <td>{col}</td>)}</tr>)}
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  rows: state.rows,
  loading: state.loading
});

export default connect(mapStateToProps)(Spreadsheet);

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { DateTime } from "luxon";
import styled from "styled-components";
import { SPREADSHEET_REQ_START, HIDE_APP } from "./actions";

const Table = styled.table`
  font-size: 14px;
  margin: 5px;

  > thead > tr > th {
    text-align: left;
    padding-bottom: .5em;
  }

  > tbody > tr > td {
    padding-right: 1em;
    padding-bottom: .4em;
  }
`;

class Spreadsheet extends React.Component {
  static propTypes = {
    loading: PropTypes.bool,
    rows: PropTypes.array,
    hide: PropTypes.func.isRequired,
  };

  componentWillMount() {
    chrome.runtime.sendMessage({ command: SPREADSHEET_REQ_START }, response => {
      if (response) {
        // console.log("message from backend:", response.message);
      }
    });
  }

  render() {
    const { loading, rows, hide } = this.props;
    if (loading) {
      return "loading spreadsheet";
    }
    if (typeof rows === "undefined") {
      return "not yet fetched";
    }

    const today = DateTime.local().startOf("day");
    const relevant = rows.filter(row => row[0] <= today && row[1] >= today);
    if (relevant.length === 0) {
      setTimeout(hide, 2000);
      return "No relevant notes";
    }
    return (
      <Table>
        <thead>
          <tr>
            <th>Action</th>
            <th>Assignee</th>
          </tr>
        </thead>
        <tbody>
          {relevant.map((row, index) => (
            <tr key={index}>
              <td>{row[2]}</td>
              <td>{row[3]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

const mapStateToProps = state => ({
  rows: state.rows,
  loading: state.loading
});

const mapDispatchToProps = dispatch => ({
  hide: () => dispatch({ type: HIDE_APP })
})

export default connect(mapStateToProps, mapDispatchToProps)(Spreadsheet);

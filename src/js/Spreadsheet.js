import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { DateTime } from "luxon";
import styled from "styled-components";
import { SPREADSHEET_REQ_START } from "./actions";

const Table = styled.table`
  > thead > tr > th {
    text-align: left;
  }
`;

class Spreadsheet extends React.Component {
  static propTypes = {
    loading: PropTypes.bool,
    rows: PropTypes.array
  };

  componentWillMount() {
    chrome.runtime.sendMessage({ command: SPREADSHEET_REQ_START }, response => {
      if (response) {
        // console.log("message from backend:", response.message);
      }
    });
  }

  render() {
    const { loading, rows } = this.props;
    if (loading) {
      return "loading spreadsheet";
    }

    const today = DateTime.local();
    const relevant = rows.filter(row => row[0] <= today && row[1] >= today);
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

export default connect(mapStateToProps)(Spreadsheet);

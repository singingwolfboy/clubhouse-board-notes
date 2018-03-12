import {
  SHOW_APP,
  HIDE_APP,
  LOG_IN,
  LOG_OUT,
  SPREADSHEET_REQ_START,
  SPREADSHEET_REQ_SUCCESS
} from "./actions";
import { maybeParseDate } from "./parsing";

const cleanedSpreadsheetData = data =>
  data.values
    .filter(row => row.length > 0)
    .map(row => row.map(cell => maybeParseDate(cell)));

const initialState = {
  showApp: true,
  authenticated: false,
  loading: false,
  rows: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_APP:
      return {
        ...state,
        showApp: true
      };
    case HIDE_APP:
      return {
        ...state,
        showApp: false
      };
    case LOG_IN:
      return {
        ...state,
        authenticated: true
      };
    case LOG_OUT:
      return {
        ...state,
        authenticated: false
      };
    case SPREADSHEET_REQ_START:
      return {
        ...state,
        loading: true
      };
    case SPREADSHEET_REQ_SUCCESS:
      return {
        ...state,
        loading: false,
        rows: cleanedSpreadsheetData(action.data)
      };
    default:
      return state;
  }
}

export default reducer;

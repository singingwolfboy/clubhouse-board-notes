import { DateTime } from "luxon";

import {
  INIT,
  LOG_IN,
  LOG_OUT,
  SPREADSHEET_REQ_START,
  SPREADSHEET_REQ_SUCCESS,
  LIST_REQ_START,
  LIST_REQ_SUCCESS
} from "./actions";

const DATETIME_FORMATS = [
  "DDD",
  "DD",
  "D",
  "LLLL d, yyyy",
  "LLLL dd, yyyy",
  "LLLL d yyyy",
  "LLLL dd yyyy"
];

export const maybeParseDate = str => {
  let dt = DateTime.fromISO(str);
  let index = 0;
  while (!dt.isValid && index < DATETIME_FORMATS.length) {
    dt = DateTime.fromFormat(str, DATETIME_FORMATS[index]);
    index += 1;
  }
  if (dt.isValid) {
    return dt;
  } else {
    return str;
  }
};

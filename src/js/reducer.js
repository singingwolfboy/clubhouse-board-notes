import { LOG_IN, LOG_OUT } from "./actions";

const initialState = {
  authenticated: false
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        authenticated: true
      }
    case LOG_OUT:
      return {
        ...state,
        authenticated: false
      }
    default:
      return state;
  }
}

export default reducer;

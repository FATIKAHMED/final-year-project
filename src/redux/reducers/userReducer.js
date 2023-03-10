import * as TYPES from "redux/types";

const initialState = {
  all: [],
  users: [],
  employees: []
};
export default function (state = initialState, { payload, type }) {
  switch (type) {
    case TYPES.SET_EMPLOYEES_USER_STORE:
      return {
        ...state,
        employees: payload,
      };
    case TYPES.SET_STUDENTS_USER_STORE:
      return {
        ...state,
        users: payload
      };
    case TYPES.SET_USER_STORE:
      return {
        ...state,
        all: payload,
      };
    case TYPES.RESET_USER_STORE:
      return {
        ...state,
        all: [],
        users: [],
        employees: []
      };
    default:
      return state;
  }
}

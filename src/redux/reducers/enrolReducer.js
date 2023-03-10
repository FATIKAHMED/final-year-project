import * as TYPES from "redux/types";

const initialState = {
    current: {},
};
export default function (state = initialState, { payload, type }) {
    switch (type) {
        case TYPES.SET_CURRENT_ENROL:
            return {
                ...state,
                current: payload
            };
        case TYPES.RESET_CURRENT_ENROL:
            return {
                ...state,
                current: {}
            };

        default:
            return state;
    }
}
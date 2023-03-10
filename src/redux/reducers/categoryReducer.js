import * as TYPES from "redux/types";

const initialState = {
    all: [],
};
export default function (state = initialState, { payload, type }) {
    switch (type) {
        case TYPES.SET_CATEGORY_STORE:
            return {
                ...state,
                all: payload,
            };
        case TYPES.RESET_CATEGORY_STORE:
            return {
                ...state,
                all: [],
            };
        default:
            return state;
    }
}

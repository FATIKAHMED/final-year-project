import * as TYPES from "redux/types";

const initialState = {
    loading: false,
};
export default function (state = initialState, { payload, type }) {
    switch (type) {
        case TYPES.SET_LEARN_LOADING:
            return {
                ...state,
                loading: payload
            };
        case TYPES.RESET_LEARN_LOADING:
            return {
                ...state,
                loading: false,
            };

        default:
            return state;
    }
}
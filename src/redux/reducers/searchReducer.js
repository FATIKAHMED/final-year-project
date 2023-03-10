import * as TYPES from "redux/types";

const initialState = {
    course: {
        docs: []
    },
    query: null
};
export default function (state = initialState, { payload, type }) {
    switch (type) {
        case TYPES.SET_COURSE_SEARCH:
            return {
                ...state,
                course: payload.result,
                query: payload.query,
            };
        case TYPES.RESET_COURSE_SEARCH:
            return {
                ...state,
                course: {
                    docs: []
                },
                query: null
            };

        default:
            return state;
    }
}
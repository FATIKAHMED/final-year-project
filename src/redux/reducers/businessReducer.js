import * as TYPES from "redux/types";

const initialState = {
    businessDetails: {},
    businessCourseDetails: {}
};
export default function (state = initialState, { payload, type }) {
    switch (type) {
        case TYPES.SET_BUSINESS_DETAILS:
            return {
                ...state,
                businessDetails: payload,
            };
        case TYPES.RESET_BUSINESS_DETAILS:
            return {
                ...state,
                businessDetails: {}
            };
        case TYPES.SET_BUSINESS_USER_COURSE_DETAILS:
            return {
                ...state,
                businessCourseDetails: payload,
            };
        case TYPES.RESET_BUSINESS_USER_COURSE_DETAILS:
            return {
                ...state,
                businessCourseDetails: {}
            };
        default:
            return state;
    }
}
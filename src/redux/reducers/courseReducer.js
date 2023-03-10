import * as TYPES from "redux/types";

const initialState = {
    store: {
        docs: []
    },
    bought: [],
    enrolled: [],
    enrollDetails: {},
    courseDetails: {},
    courseDetailsTrailers: [],
    loading: false,
};
export default function (state = initialState, { payload, type }) {
    switch (type) {
        case TYPES.LOADING_COURSES:
            return {
                ...state,
                loading: true,
            };
        case TYPES.GET_COURSES:
            return {
                ...state,
                store: payload.store,
                bought: payload.bought,
                loading: false,
            };
        case TYPES.GET_FILTERED_COURSES:
            return {
                ...state,
                store: payload.store,
                loading: false,
            };
        case TYPES.REMOVE_COURSES:
            return {
                ...state,
                store: {
                    docs: []
                },
                bought: [],
                loading: false,
            };
        case TYPES.GET_A_COURSE_DETAILS:
            return {
                ...state,
                courseDetails: payload.courseDetails,
                courseDetailsTrailers: payload.courseDetailsTrailers,
                loading: false,
            }
        case TYPES.RESET_A_COURSE_DETAILS:
            return {
                ...state,
                courseDetails: {},
                courseDetailsTrailers: [],
                loading: false,
            }

        case TYPES.GET_ENROLLED_COURSES:
            return {
                ...state,
                enrolled: payload,
                loading: false,
            }
        case TYPES.REMOVE_ENROLLED_COURSES:
            return {
                ...state,
                enrolled: [],
                loading: false,
            }
        case TYPES.SET_COURSE_RATING:
            return {
                ...state,
                enrolled: payload,
                loading: false,
            }
        case TYPES.GET_COURSE_ENROLL_DETAILS:
            return {
                ...state,
                enrollDetails: payload,
                loading: false,
            }
        // case TYPES.SET_COURSE_ENROLLMENT:
        //     return {
        //         ...state,
        //         enrolled: payload,
        //     }

        default:
            return state;
    }
}
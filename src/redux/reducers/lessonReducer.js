import * as TYPES from "redux/types";

const initialState = {
    currentLesson: {},
    nextLesson: {},
    prevLesson: {},
    allLessons: [],

};
export default function (state = initialState, { payload, type }) {
    switch (type) {
        case TYPES.GET_LESSON:
            return {
                ...state,
                currentLesson: payload.currentLesson,
                allLessons: payload.allLessons,
                nextLesson: payload.nextLesson,
                prevLesson: payload.prevLesson,
            };
        case TYPES.RESET_LESSON:
            return {
                ...state,
                currentLesson: {},
                nextLesson: {},
                prevLesson: {},
                allLessons: []
            }
        case TYPES.UPDATE_CURRENT_LESSON:
            return {
                ...state,
                currentLesson: payload.currentLesson,
                nextLesson: payload.nextLesson,
                prevLesson: payload.prevLesson,
            }
        default:
            return state;
    }
}
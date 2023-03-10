import * as TYPES from "redux/types";

const initialState = {
    questions: [],
    topic: null,
    totalQuestions: 0,
};
export default function (state = initialState, { payload, type }) {
    switch (type) {
        case TYPES.SET_TOPIC_QUESTIONS:
            return {
                ...state,
                questions: payload.questions,
                topic: payload._id
            };
        case TYPES.GET_TOPIC_QUESTIONS_LENGTH:
            return {
                ...state,
                totalQuestions: payload
            };
        case TYPES.RESET_TOPIC_QUESTIONS:
            return {
                questions: [],
                topic: null
            };

        default:
            return state;
    }
}
import * as TYPES from "redux/types";

const initialState = {
    currentTopic: {},
    allTopics: [],
    prevTopic: {},
    nextTopic: {},
};
export default function (state = initialState, { payload, type }) {
    switch (type) {
        case TYPES.GET_TOPIC:
            return {
                ...state,
                currentTopic: payload.currentTopic,
                allTopics: payload.allTopics,
                nextTopic: payload.nextTopic,
                prevTopic: payload.prevTopic,
            };
        case TYPES.RESET_TOPIC:
            return {
                ...state,
                currentTopic: {},
                allTopics: [],
                nextTopic: {},
                prevTopic: {},
            }
        case TYPES.UPDATE_CURRENT_TOPIC:
            return {
                ...state,
                currentTopic: payload.currentTopic,
                nextTopic: payload.nextTopic,
                prevTopic: payload.prevTopic,
                allTopics: payload.allTopics,
            }
        case TYPES.UPDATE_CURRENT_TOPIC_PROGRESS:
            return {
                ...state,
                currentTopic: {
                    ...state.currentTopic,
                    progress: payload
                },
            }

        // case TYPES.UPDATE_TOPIC_COMPLETION_STATUS:
        //     return {
        //         ...state,
        //     }
        default:
            return state;
    }
}
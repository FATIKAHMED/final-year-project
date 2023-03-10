import {
    // axiosDEF,
    axiosJWT
} from 'utils/axios';
import * as TYPES from "redux/types";
// import { ROLE } from "utils/constants";
// import { getNextAndPrevItemsOfArray } from 'utils/misc';
// import { updateUserTopicProgressDetailsAction } from 'redux/actions'

export const setCurrentTopicQuestions = (payload) => {
    return {
        type: TYPES.SET_TOPIC_QUESTIONS,
        payload
    }
}
export const detoxCurrentTopicQuestions = () => {
    return {
        type: TYPES.RESET_TOPIC_QUESTIONS,
    }
}
export const currentTopicQuestionsLength = (payload) => {
    return {
        type: TYPES.GET_TOPIC_QUESTIONS_LENGTH,
        payload
    }
}

export const getTopicTotalQuestionsAction = (topicId) => async (dispatch) => {

    const url = `/api/topic/${topicId}/questionCount`;


    try {
        const response = await axiosJWT.get(url)
        if (response.status === 200 || response.status === 201) {

            dispatch(currentTopicQuestionsLength(response.data))
            return {
                res: response.data,
                error: null,
            }
        }
        else {
            return {
                res: null,
                error: response,
            }
        }
    }
    catch (error) {
        dispatch(detoxCurrentTopicQuestions())

        return {
            res: null,
            error,
        }
    }

}

export const getTopicQuestionsAction = (topicId) => async (dispatch) => {

    const url = `/api/topic/${topicId}/question`;


    try {
        const response = await axiosJWT.get(url)
        // console.log("GET QUESTIONS", response)
        if (response.status === 200 || response.status === 201) {

            dispatch(setCurrentTopicQuestions(response.data))
            return {
                res: response.data,
                error: null,
            }
        }
        else {
            return {
                res: null,
                error: response,
            }
        }
    }
    catch (error) {
        dispatch(detoxCurrentTopicQuestions())

        return {
            res: null,
            error,
        }
    }

}

export const createQuestionAction = (topicId, questionPayload) => async dispatch => {

    const url = `/api/topic/${topicId}/question`;


    try {
        const response = await axiosJWT.post(url, questionPayload)
        // console.log("CREATE QUESTION", response)
        if (response.status === 200 || response.status === 201) {
            dispatch(getTopicQuestionsAction(topicId))
            return {
                res: response.data,
                error: null,
            }
        }
        else {
            return {
                res: null,
                error: response,
            }
        }
    }
    catch (error) {
        return {
            res: null,
            error,
        }
    }

}
export const createQuestionReplyAction = (topicId, questionId, replyPayload) => async dispatch => {

    const url = `/api/topic/question/${questionId}`;


    try {
        const response = await axiosJWT.put(url, replyPayload)
        // console.log("Reply QUESTION", response)
        if (response.status === 200 || response.status === 201) {
            dispatch(getTopicQuestionsAction(topicId))
            return {
                res: response.data,
                error: null,
            }
        }
        else {
            return {
                res: null,
                error: response,
            }
        }
    }
    catch (error) {
        return {
            res: null,
            error,
        }
    }

}


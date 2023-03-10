import {
    // axiosDEF,
    axiosJWT
} from 'utils/axios';
import * as TYPES from "redux/types";
// import { ROLE } from "utils/constants";
import { getNextAndPrevItemsOfArray, getItemWithProgress, getAllItemsWithProgress } from 'utils/misc';
import {
    resetLearnLoading, setLearnLoading, getCourseEnrollDetailsAction,
    changeCurrentLessonDetailsAction, getCourseEnrollDetails, setCurrentEnrol
} from 'redux/actions'

export const fillupTopicAction = (payload) => {
    return {
        type: TYPES.GET_TOPIC,
        payload,
    };
};

export const updateCurrentTopicAction = (payload) => {
    return {
        type: TYPES.UPDATE_CURRENT_TOPIC,
        payload,
    };
};
export const updateCurrentTopicProgressAction = (payload) => {
    return {
        type: TYPES.UPDATE_CURRENT_TOPIC_PROGRESS,
        payload,
    };
};



export const detoxTopicAction = () => {
    return {
        type: TYPES.RESET_TOPIC,
    };
};

export const setCurrentTopicDetailsAction =
    (topic, allTopics) => async (dispatch, getState) => {

        try {
            dispatch(detoxTopicAction());
            dispatch(setLearnLoading(true))

            const topicProgress = getState().enrol.current.topicsProgress
            const progress = topicProgress.filter(item => item.id === topic._id)[0]
            const { nextItem, prevItem } = getNextAndPrevItemsOfArray(allTopics, topic)
            const itemsProgress = getItemWithProgress(nextItem, prevItem, topicProgress);

            const allTopicsWithProgress = getAllItemsWithProgress(allTopics, topicProgress)

            const payload = {
                currentTopic: {
                    details: topic,
                    progress: {
                        complete: progress.completedDuration,
                        remaining: progress.remainingDuration,
                        duration: progress.totalDuration,
                        isCompleted: progress.isCompleted,
                    },
                },
                allTopics: allTopicsWithProgress,
                nextTopic: itemsProgress.nextItem,
                prevTopic: itemsProgress.prevItem,
            }

            dispatch(fillupTopicAction(payload))
            dispatch(resetLearnLoading())

            return {
                res: payload,
                error: null,
            };

        } catch (e) {
            dispatch(resetLearnLoading())
            dispatch(detoxTopicAction());
            //? video not playing UPDATE_CURRENT_LESSON

            return {
                res: null,
                error: e,
            };

        }
    }

export const changeCurrentTopicDetailsAction =
    (topic, allTopics) => async (dispatch, getState) => {

        try {
            dispatch(setLearnLoading(true))

            const topicProgress = getState().enrol.current.topicsProgress
            const progress = topicProgress.filter(item => item.id === topic._id)[0]

            const { nextItem, prevItem } = getNextAndPrevItemsOfArray(allTopics, topic)
            const itemsProgress = getItemWithProgress(nextItem, prevItem, topicProgress);

            const allTopicsWithProgress = getAllItemsWithProgress(allTopics, topicProgress)

            const payload = {
                currentTopic: {
                    details: topic,
                    progress: {
                        complete: progress.completedDuration,
                        remaining: progress.remainingDuration,
                        duration: progress.totalDuration,
                        isCompleted: progress.isCompleted,
                    },
                },
                allTopics: allTopicsWithProgress,
                nextTopic: itemsProgress.nextItem,
                prevTopic: itemsProgress.prevItem,
            }
            dispatch(updateCurrentTopicAction(payload))
            dispatch(resetLearnLoading())

            return {
                res: payload,
                error: null,
            };

        } catch (e) {
            dispatch(resetLearnLoading())

            return {
                res: null,
                error: e,
            };

        }
    }
export const updateUserContentProgressFrontendReduxAction = (payload) => {
    // console.log("updateUserContentProgressFrontendReduxAction", payload);
    return {
        type: TYPES.USER_CONTENT_PROGRESS_UPDATE,
        payload
    }
}
// export const updateUserContentProgressAction = (topicId, user, courseId, lessonId, progressObject, markComplete) => async (dispatch) => {

//     const url = `/api/progress/user/${user._id}/update-content`;
//     const requestPayload = { topicId, courseId, lessonId, progressObject, markComplete }

//     try {
//         const response = await axiosJWT.put(url, requestPayload)

//         if (response.status === 200 || response.status === 201) {

//             // Convert response back to array
//             const userProgress = user.contentProgress
//             // console.log("NEWCONTENT PROGRESS B4", userProgress)

//             let newTopicsArr = userProgress.topics.filter(item => item.id !== topicId)
//             let newLessonsArr = userProgress.lessons.filter(item => item.id !== lessonId)
//             let newCoursesArr = userProgress.courses.filter(item => item.id !== courseId)
//             newTopicsArr.push(response.data.topicProgress)
//             newLessonsArr.push(response.data.lessonProgress)
//             newCoursesArr.push(response.data.courseProgress)

//             // newContentProgress.topics.filter(item => item.id === topicId)[0] = response.data.topicProgress
//             // newContentProgress.lessons.filter(item => item.id === lessonId)[0] = response.data.lessonProgress
//             // newContentProgress.courses.filter(item => item.id === courseId)[0] = response.data.courseProgress

//             const newUserProgress = { topics: newTopicsArr, lessons: newLessonsArr, courses: newCoursesArr }

//             // console.log("NEWCONTENT PROGRESS A4", newUserProgress)
//             dispatch(updateUserContentProgressFrontendReduxAction(newUserProgress))

//             return {
//                 res: response.data,
//                 error: null,
//             }
//         }
//         else {
//             return {
//                 res: null,
//                 error: response,
//             }
//         }
//     }
//     catch (error) {
//         return {
//             res: null,
//             error,
//         }
//     }

// }

// export const createQuestionAction = (topicId, questionPayload) => async dispatch => {

//     const url = `/api/topic/${topicId}/question`;


//     try {
//         const response = await axiosJWT.post(url, questionPayload)
//         console.log("CREATE QUESTION", response)
//         if (response.status === 200 || response.status === 201) {
//             return {
//                 res: response.data,
//                 error: null,
//             }
//         }
//         else {
//             return {
//                 res: null,
//                 error: response,
//             }
//         }
//     }
//     catch (error) {
//         return {
//             res: null,
//             error,
//         }
//     }

// }
// export const setUserContentProgressAction = (topicId, user, courseId, lessonId) => async dispatch => {

//     const url = `/api/progress/user/${user._id}/update-content`;

//     const requestPayload = { topicId, courseId, lessonId }


//     try {
//         const response = await axiosJWT.post(url, requestPayload)

//         if (response.status === 200 || response.status === 201) {
//             return {
//                 res: response.data,
//                 error: null,
//             }
//         }
//         else {
//             return {
//                 res: null,
//                 error: response,
//             }
//         }
//     }
//     catch (error) {
//         return {
//             res: null,
//             error,
//         }
//     }




// }


export const setTopicCompletionStatusAction = (id, status, lesson, user, enrolId) => async (dispatch, getState) => {

    const url = "/api/progress/complete"

    const currentLesson = getState().lesson.currentLesson
    const allLessons = getState().lesson.allLessons
    const allTopics = getState().topic.allTopics
    const allTopicsWithDetailsOnly = allTopics.map(item => item.details)
    const allLessonsWithDetailsOnly = allLessons.map(item => item.details)
    const currentTopic = lesson.topics.filter(item => item._id === id)[0]

    const requestPayload = {
        id,
        status,
        enrolId,
        lessonId: lesson._id
    }

    try {

        await axiosJWT.put(url, requestPayload)

        await dispatch(getCourseEnrollDetailsAction(enrolId));
        await dispatch(changeCurrentTopicDetailsAction(currentTopic, allTopicsWithDetailsOnly))
        await dispatch(changeCurrentLessonDetailsAction(currentLesson.details, allLessonsWithDetailsOnly))

        return {
            res: true,
            error: null,
        };


    } catch (error) {
        // console.log("ERROR", error.response)

        return {
            res: null,
            error: error.response,
        };

    }
}
export const updateTopicProgressAction = (progress, topicId, enrolId) => async (dispatch, getState) => {

    const url = "/api/progress/update"

    const currentLesson = getState().lesson.currentLesson
    const allLessons = getState().lesson.allLessons
    const allTopics = getState().topic.allTopics
    const allTopicsWithDetailsOnly = allTopics.map(item => item.details)
    const allLessonsWithDetailsOnly = allLessons.map(item => item.details)
    const currentTopic = getState().topic.currentTopic.details

    const payload = { topicId, enrolId, progress }

    try {

        const res = await axiosJWT.put(url, payload)
        const currentTopicProgress = {
            complete: res.data.completedDuration,
            remaining: res.data.remainingDuration,
            duration: res.data.totalDuration,
            isCompleted: res.data.isCompleted
        }
        // console.log("RESPONSE", res, "currentTopicProgress", currentTopicProgress)

        // TODO: Dispatch topic.currentTopic.progress update
        dispatch(updateCurrentTopicProgressAction(currentTopicProgress))

        await dispatch(getCourseEnrollDetailsAction(enrolId));

        // dispatch(getCourseEnrollDetails(res.data))
        // dispatch(setCurrentEnrol(res.data))


        // await dispatch(changeCurrentTopicDetailsAction(currentTopic, allTopicsWithDetailsOnly))
        // await dispatch(changeCurrentLessonDetailsAction(currentLesson.details, allLessonsWithDetailsOnly))

        return {
            res: true,
            error: null,
        };


    } catch (error) {
        // console.log("ERROR", error.response)

        return {
            res: null,
            error: error.response,
        };

    }
}

// export const setTopicProgressCompletionAction = (id, progress, lesson, user, courseId, topicsProgressId) => async (dispatch) => {
//     const url = "/api/progress"
//     const url2 = `/api/topic/list/lesson/${lesson._id}`

//     const url3 = '/api/progress/topic/update'
//     const url3RequestPayload = {
//         topicsProgressId: topicsProgressId[0]._id,
//         topicId: id,
//         lessonId: lesson._id,
//         courseId,
//         userId: user._id,
//         progress
//     }
//     // console.log("userTopicProgressResponse call", url3RequestPayload)


//     const requestPayload = {
//         model: "topic",
//         id,
//         progress,
//     }


//     try {

//         const userTopicProgressResponse = await axiosJWT.put(url3, url3RequestPayload)
//         // console.log("userTopicProgressResponse", userTopicProgressResponse)
//         const changeStatusResponse = await axiosJWT.put(url, requestPayload)
//         const allTopicsResponse = await axiosJWT.get(url2)
//         const res = await dispatch(setCurrentTopicDetailsAction(changeStatusResponse.data, allTopicsResponse.data.topics, user))

//         // console.log("setTopicProgressCompletionAction", "newTopic", changeStatusResponse.data, "all topics", allTopicsResponse.data.topics, "FINALRES", res)


//     }
//     catch (error) {
//         // console.log("/api/progress/ CATCH ERROR", error.response)

//         return {
//             res: null,
//             error: error.response,
//         };
//     }
// }

// export const updateTopicCompletionStatusAction = (payload) => {
//     return {
//         type: TYPES.UPDATE_TOPIC_COMPLETION_STATUS,
//         payload
//     }
// }
import {
  // axiosDEF,
  axiosJWT
} from "utils/axios";
import * as TYPES from "redux/types";
// import { ROLE } from "utils/constants";
// import isEmpty from "utils/is-empty";
import { getNextAndPrevItemsOfArray, sortArrayByDate, getItemWithProgress, getAllItemsWithProgress } from "utils/misc";
import { resetLearnLoading, setLearnLoading } from 'redux/actions'
import isEmpty from "utils/is-empty";

export const fillupLessonAction = (res) => {
  const payload = res;
  return {
    type: TYPES.GET_LESSON,
    payload,
  };
};

export const detoxLessonAction = () => {
  return {
    type: TYPES.RESET_LESSON,
  };
};

export const setCurrentLessonDetailsAction =
  (lesson, allLessons) => async (dispatch, getState) => {
    try {
      dispatch(detoxLessonAction());
      dispatch(setLearnLoading(true))

      const lessonProgress = getState().enrol.current.lessonsProgress
      const progress = lessonProgress.filter(item => item.id === lesson._id)[0]

      const { nextItem, prevItem } = getNextAndPrevItemsOfArray(
        allLessons,
        lesson
      );
      const itemsProgress = getItemWithProgress(nextItem, prevItem, lessonProgress);
      const allLessonssWithProgress = getAllItemsWithProgress(allLessons, lessonProgress)


      const payload = {
        currentLesson: {
          details: lesson,
          progress: {
            complete: progress.completedDuration,
            remaining: progress.remainingDuration,
            duration: progress.totalDuration,
            isCompleted: progress.isCompleted,
          },
        },
        allLessons: allLessonssWithProgress,
        nextLesson: itemsProgress.nextItem,
        prevLesson: itemsProgress.prevItem,
      };

      dispatch(fillupLessonAction(payload));
      dispatch(resetLearnLoading())

      return {
        res: payload,
        error: null,
      };
    } catch (e) {
      dispatch(detoxLessonAction());
      dispatch(resetLearnLoading())

      return {
        res: null,
        error: e,
      };
    }
  };

export const updateCurrentLessonAction = (res) => {
  const payload = res;
  return {
    type: TYPES.UPDATE_CURRENT_LESSON,
    payload,
  };
};

export const changeCurrentLessonDetailsAction =
  (lesson, allLessons) => async (dispatch, getState) => {
    try {
      dispatch(setLearnLoading(true))

      const lessonProgress = getState().enrol.current.lessonsProgress
      const progress = lessonProgress.filter(item => item.id === lesson._id)[0]


      const { nextItem, prevItem } = getNextAndPrevItemsOfArray(
        allLessons,
        lesson
      );

      const itemsProgress = getItemWithProgress(nextItem, prevItem, lessonProgress);
      const allLessonssWithProgress = getAllItemsWithProgress(allLessons, lessonProgress)


      const payload = {
        currentLesson: {
          details: lesson,
          progress: {
            complete: progress.completedDuration,
            remaining: progress.remainingDuration,
            duration: progress.totalDuration,
            isCompleted: progress.isCompleted,
          },
        },
        allLessons: allLessonssWithProgress,
        nextLesson: itemsProgress.nextItem,
        prevLesson: itemsProgress.prevItem,
      };

      dispatch(updateCurrentLessonAction(payload));
      dispatch(resetLearnLoading())
      return {
        res: payload,
        error: null,
      };
    } catch (e) {
      // dispatch(detoxLessonAction());
      dispatch(resetLearnLoading())

      return {
        res: null,
        error: e,
      };
    }
  };
// export const changeCurrentLessonDetailsAction =
//   (lesson, allLessons) => async (dispatch) => {
//     // console.log(
//     //   "setLessonProgressCompletionAction changeCurrentLessonDetailsAction",
//     //   lesson,
//     //   allLessons
//     //   //// allLessonsResponse.data
//     // );
//     try {
//       const { duration, progressCompleted } = lesson;
//       const remaining = duration - progressCompleted;
//       const isCompleted = progressCompleted === duration ? true : false; // TODO: Or the user has completed it by checking true

//       const { nextItem, prevItem } = getNextAndPrevItemsOfArray(
//         allLessons,
//         lesson
//       );

//       const payload = {
//         currentLesson: {
//           details: lesson,
//           progress: {
//             complete: progressCompleted,
//             remaining,
//           },
//           duration,
//           isCompleted,
//         },
//         nextLesson: nextItem,
//         prevLesson: prevItem,
//       };

//       dispatch(updateCurrentLessonAction(payload));

//       return {
//         res: payload,
//         error: null,
//       };
//     } catch (e) {
//       // dispatch(detoxLessonAction());

//       return {
//         res: null,
//         error: e,
//       };
//     }
//   };

// export const setLessonProgressCompletionAction =
//   (id, progress, currentLessonsAll) => async (dispatch) => {
//     // TODO: Get lesson id and mark a percentage of progress completion out of all the topics in that lesson completed

//     const url = "/api/progress";
//     //// const url2 = `/api/lesson/list/course/${course._id}`;

//     const requestPayload = {
//       model: "lesson",
//       id,
//       progress,
//     };

//     try {
//       const changeStatusResponse = await axiosJWT.put(url, requestPayload);

//       // const { _id, progressCompleted, duration, isCompleted } =
//       //   await changeStatusResponse.data;

//       let otherLessons = currentLessonsAll.filter(
//         (lesson) => lesson._id !== changeStatusResponse.data._id
//       );
//       otherLessons.push(changeStatusResponse.data);
//       const sorted = sortArrayByDate(otherLessons, "createdAt");

//       // console.log("setLessonProgressCompletionAction", sorted);

//       // dispatch(
//       //   changeCurrentLessonDetailsAction(changeStatusResponse.data, sorted)
//       // );
//     } catch (error) {
//       // console.log("/api/progress/ CATCH ERROR", error.response);

//       return {
//         res: null,
//         error: error.response,
//       };
//     }
//   };

// export const setLessonStatusCompletionAction =
//   (id, status, currentLessonsAll) => async (dispatch) => {
//     const url = "/api/progress/complete";
//     // const url2 = `/api/topic/list/lesson/${lesson._id}`;

//     const requestPayload = {
//       model: "lesson",
//       id,
//       status,
//     };

//     // // const remaining = duration - progressCompleted
//     // // const isCompleted = status ? status : !progressCompleted

//     try {
//       const changeStatusResponse = await axiosJWT.put(url, requestPayload);

//       let otherLessons = currentLessonsAll.filter(
//         (lesson) => lesson._id !== changeStatusResponse.data._id
//       );
//       otherLessons.push(changeStatusResponse.data);
//       const sorted = sortArrayByDate(otherLessons, "createdAt");

//       // console.log("setLessonCompletionStatusAction", sorted);

//       // dispatch(
//       //   changeCurrentLessonDetailsAction(changeStatusResponse.data, sorted)
//       // );

//       // return {
//       //   res,
//       //   error: null,
//       // };
//     } catch (error) {
//       // console.log("/api/progress/complete CATCH ERROR", error.response);

//       return {
//         res: null,
//         error: error.response,
//       };
//     }
//   };

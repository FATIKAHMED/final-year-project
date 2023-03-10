import { axiosDEF, axiosJWT } from 'utils/axios';
import * as TYPES from "redux/types";
// import { ROLE } from "utils/constants";
import { fillupCourseSearchAction, detoxCourseSearchAction, setCurrentEnrol } from 'redux/actions'
import isEmpty from 'utils/is-empty'
export const fillupCourseAction = (res) => {
    const payload = res;
    return {
        type: TYPES.GET_COURSES,
        payload,
    };
};
export const fillupEnrolledCourseAction = (payload) => {
    return {
        type: TYPES.GET_ENROLLED_COURSES,
        payload,
    };
};
export const courseLoadingAction = () => {
    return {
        type: TYPES.LOADING_COURSES,
    };
};



export const detoxCourseAction = () => {
    return {
        type: TYPES.REMOVE_COURSES,
    };
};
export const detoxEnrolledCoursesAction = () => {
    return {
        type: TYPES.REMOVE_ENROLLED_COURSES,
    };
};

export const getCourseDetailsBySlugAction = (slug) => async (dispatch) => {

    const url = `/api/course/slug/${slug}`;

    try {
        // dispatch(detoxSingleCourseDetails());

        const res = await axiosDEF.get(url);

        // const previewableTopicsArray = res.data.lessons.map(lesson => lesson.topics.filter(topic => topic.isPreviewable === true))[0]

        const payload = {
            courseDetails: res.data,
            courseDetailsTrailers: res.data.trailer
        }

        // console.log("getCourseDetailsAction", res, "payload", payload)


        dispatch(getSingleCourseDetails(payload));
        return {
            res: res.data,
            error: null,
        };
    } catch (e) {
        dispatch(detoxSingleCourseDetails());

        return {
            res: null,
            error: e,
        };
    }
}
export const getCourseDetailsAction = (courseId, isVideoLessonFlag = false) => async (dispatch) => {
    const url = `/api/course/${courseId}?videoLessonFlag=${isVideoLessonFlag}`;

    try {
        // dispatch(detoxSingleCourseDetails());

        const res = await axiosDEF.get(url);

        // const previewableTopicsArray = res.data.lessons.map(lesson => lesson.topics.filter(topic => topic.isPreviewable === true))[0]

        const payload = {
            courseDetails: res.data,
            courseDetailsTrailers: res.data.trailer
        }

        // console.log("getCourseDetailsAction", res, "payload", payload)


        dispatch(getSingleCourseDetails(payload));
        return {
            res: res.data,
            error: null,
        };
    } catch (e) {
        dispatch(detoxSingleCourseDetails());

        return {
            res: null,
            error: e,
        };
    }
}
export const getCourseEnrollDetailsAction = (enrolledId) => async (dispatch) => {
    const url = `/api/course/enroll/${enrolledId}`;

    try {
        // dispatch(detoxSingleCourseDetails());

        const res = await axiosJWT.get(url);

        // console.log("getCourseEnrollDetailsAction", res.data)
        dispatch(getCourseEnrollDetails(res.data))
        dispatch(setCurrentEnrol(res.data))

        return {
            res: res.data,
            error: null,
        };
    } catch (e) {

        return {
            res: null,
            error: e,
        };
    }
}

export const getCourseEnrollDetails = (payload) => {
    return {
        type: TYPES.GET_COURSE_ENROLL_DETAILS,
        payload,
    };
}
export const getSingleCourseDetails = (payload) => {
    return {
        type: TYPES.GET_A_COURSE_DETAILS,
        payload,
    };
}

export const detoxSingleCourseDetails = () => {
    return {
        type: TYPES.RESET_A_COURSE_DETAILS,
    };
}

export const searchCourse = (query, page = 1, limit = 10) => async (dispatch) => {
    const url = `/api/course/search?query=${query}&page=${page}&limit=${limit}`
    const path = `/search?query=${query}&page=${page}&limit=${limit}`

    try {
        const res = await axiosDEF.get(url)
        // console.log("SEARCH COURSE RES", res)

        // const searchUrl = url.replace('/api/course/', '')
        // const path = urlCourses.replace("/api/courses", "")


        dispatch(fillupCourseSearchAction({ result: res.data, query }))

        return {
            res: path,
            error: null,
        };

    } catch (error) {
        dispatch(detoxCourseSearchAction())
        // console.log("ERROR OCCURED SEARCH COURSE", error);
        return {
            res: null,
            error,
        };
    }
}

export const getCoursesList = (userId, page = "1") => async (dispatch) => {
    const url = page ? `/api/course?page=${page}` : `/api/course/`;


    try {
        dispatch(detoxCourseAction());
        dispatch(courseLoadingAction());
        const res = await axiosDEF.get(url);
        // console.log("getCoursesList", res)

        const enrolledCourses = res.data.docs.filter(course => course.enrolled.find(enrolledUserId => enrolledUserId === userId))
        const payload = {
            store: res.data,
            bought: enrolledCourses
        }

        dispatch(fillupCourseAction(payload));
        return {
            res: res.data,
            error: null,
        };
    } catch (e) {
        dispatch(detoxCourseAction());
        return {
            res: null,
            error: e,
        };
    }
};
export const getEnrolledCoursesList = (userId, filter) => async (dispatch) => {
    let url = `/api/course/user/${userId}`;
    if (!isEmpty(filter))
        url = `/api/course/user/${userId}?categories=${filter.categories}&progress=${filter.progress}`;

    try {
        dispatch(detoxEnrolledCoursesAction());
        const res = await axiosJWT.get(url);

        dispatch(fillupEnrolledCourseAction(res.data))

        return {
            res: res.data,
            error: null,
        };
    } catch (e) {
        dispatch(detoxEnrolledCoursesAction());

        return {
            res: null,
            error: e,
        };
    }
};

// DISABLED API
export const enrollUserInCourses = (userId, courses, amount) => async (dispatch) => {

    const url = `/api/course/multiple/enroll`;

    const coursesId = courses.map(item => item.id)
    const requestPayload = { userId, coursesId, amount }
    try {
        const res = await axiosJWT.put(url, requestPayload);
        // console.log("RESPONSE enrollUserInCourses", res)



        return {
            res,
            error: null
        }

    } catch (error) {
        // console.log("ERROR enrollUserInCourses", error)
        return {
            error, res: null
        }
    }


}


export const setCourseRating = (payload) => {
    return {
        type: TYPES.SET_COURSE_RATING,
        payload,
    };
}

// setUserReviewAction

export const setUserReviewAction = (obj) => async dispatch => {
    const url = '/api/review/create-review'


    try {
        const response = await axiosJWT.post(url, obj)

        dispatch(setCourseRating(response.data.enrolled))
        return {
            res: response.data,
            error: null
        }
    } catch (error) {
        return {
            res: null,
            error
        }
        // dispatch(showMessage(err.message));
    }
}


// export const setCourseEnrollment = (payload) => {
//     return {
//         type: TYPES.SET_COURSE_ENROLLMENT,
//         payload,
//     };
// }


// Enroll user in free course
export const enrollUserInCourse = ({ courseId, userId, hasUnlockUsed }) => async dispatch => {
    const url = `/api/course/${courseId}/enroll`

    const payload = {
        userId,
        hasUnlockUsed
    }
    try {
        const response = await axiosJWT.post(url, payload)

        // dispatch(setCourseEnrollment(response.data.enrolled))
        return {
            res: response.data,
            error: null
        }
    } catch (error) {
        return {
            res: null,
            error
        }
        // dispatch(showMessage(err.message));
    }
}

// // SortedCOURSE
// export const fillupSortedCourseAction = (res) => {
//     const payload = { store: res.data };
//     return {
//         type: TYPES.GET_SORTED_COURSES,
//         payload,
//     };
// };

export const fillupFilteredCourseAction = (res) => {
    const payload = { store: res.data };
    return {
        type: TYPES.GET_FILTERED_COURSES,
        payload,
    };
};
// getSortedCoursesList
export const getSortedCoursesList = ({ sort, asc }) => async dispatch => {
    const url = `/api/course?sort=${sort}&asc=${asc}`
    try {
        const response = await axiosDEF.get(url)
        // console.log("response getSortedCoursesList-->", response)
        // dispatch(fillupCourseAction(response))
        dispatch(fillupFilteredCourseAction(response))
        return {
            res: response.data,
            error: null
        }
    }
    catch (error) {
        return {
            res: null,
            error
        }
    }

}
export const getFilteredCoursesList = ({ sort = 'popularity', duration = '', asc = true, ratings = '', categories = '', features = '' }) => async dispatch => {
    ratings = isEmpty(ratings) ? '' : ratings
    const url = `/api/course?sort=${sort}&duration=${duration}&asc=${asc}&ratings=${ratings}&categories=${categories}&features=${features}`
    try {
        const response = await axiosDEF.get(url)
        // console.log("response filterCourses-->", response)
        // dispatch(fillupCourseAction(response))
        dispatch(fillupFilteredCourseAction(response))
        return {
            res: response.data,
            error: null
        }
    }
    catch (error) {
        return {
            res: null,
            error
        }
    }

}
//getCourseByCategoryId
export const getCourseByCategoryId = ({ categoryId }) => async dispatch => {
    const url = `api/course/category/${categoryId}`
    try {
        const response = await axiosDEF.get(url)
        // dispatch(fillupCourseAction(response))
        // console.log("response-->", response)
        return {
            res: response.data,
            error: null
        }
    }
    catch (error) {
        return {
            res: null,
            error
        }
    }
}
export const sortCategoryCourses = ({ categoryId, title, averageRating, price }) => async dispatch => {
    const url = `/api/course/category/${categoryId}?title=${title}&averageRating=${averageRating}&price=${price}`
    // console.log("url-->", url)

    try {
        const response = await axiosDEF.get(url)
        // dispatch(fillupCourseAction(response))
        // console.log("response-->", response)
        return {
            res: response.data,
            error: null
        }
    }
    catch (error) {
        return {
            res: null,
            error
        }
    }
}

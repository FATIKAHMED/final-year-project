import * as TYPES from "redux/types";
import { axiosJWT } from 'utils/axios'

export const fillupBusinessDetails = (payload) => {
    return {
        type: TYPES.SET_BUSINESS_DETAILS,
        payload
    }
}

export const detoxBusinessDetails = () => {
    return {
        type: TYPES.RESET_BUSINESS_DETAILS
    }
}

export const getBusinessDetailsAction = (businessId) => async dispatch => {
    const url = `/api/business/${businessId}`


    try {
        const res = await axiosJWT.get(url)

        // console.log('res getBusinessDetailsAction', res)

        if (res.status === 200 || res.status === 201) {
            dispatch(fillupBusinessDetails(res.data))
            return {
                res: res.data,
                error: null
            }
        }
        else
            return {
                res: null,
                error: { message: 'Error getting details' }
            }

    } catch (error) {
        console.error('error getBusinessDetailsAction', error.response)
        dispatch(detoxBusinessDetails())
        return {
            res: null,
            error: error.response
        }

    }
}

export const fillupBusinessUserCourseDetails = (payload) => {
    return {
        type: TYPES.SET_BUSINESS_USER_COURSE_DETAILS,
        payload
    }
}

export const detoxBusinessUserCourseDetails = () => {
    return {
        type: TYPES.RESET_BUSINESS_USER_COURSE_DETAILS
    }
}

export const getMyBusinessCourseDetailsAction = (businessUserCourseId) => async dispatch => {
    const url = `/api/business/course-access/${businessUserCourseId}`


    try {
        const res = await axiosJWT.get(url)

        // console.log('res getMyBusinessCourseDetailsAction', res)

        if (res.status === 200 || res.status === 201) {
            dispatch(fillupBusinessUserCourseDetails(res.data))
            return {
                res: res.data,
                error: null
            }
        }
        else
            return {
                res: null,
                error: { message: 'Error getting details' }
            }

    } catch (error) {
        console.error('error getMyBusinessCourseDetailsAction', error.response)
        dispatch(detoxBusinessUserCourseDetails())
        return {
            res: null,
            error: error.response
        }

    }
}





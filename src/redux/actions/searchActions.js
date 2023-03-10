import { axiosDEF, axiosJWT } from 'utils/axios';
import * as TYPES from "redux/types";
import { ROLE } from "utils/constants";
import { store } from 'redux/store'

export const fillupCourseSearchAction = (payload) => {
    return {
        type: TYPES.SET_COURSE_SEARCH,
        payload,
    };
};


export const detoxCourseSearchAction = () => {
    return {
        type: TYPES.RESET_COURSE_SEARCH,
    };
};


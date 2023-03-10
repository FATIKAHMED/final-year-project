import {
    // axiosDEF,
    axiosJWT
} from 'utils/axios';
import * as TYPES from "redux/types";
// import { ROLE } from "utils/constants";

export const fillupOrderAction = (payload) => {
    const totalCount = payload.docs.length

    return {
        type: TYPES.GET_ORDERS,
        payload: {
            data: payload,
            totalCount
        }
    };
};
export const fillupOrderRecieptAction = (payload) => {
    return {
        type: TYPES.GET_ORDER_RECIEPT,
        payload
    };
};


export const detoxOrderAction = () => {
    return {
        type: TYPES.RESET_ORDERS,
    };
};
export const detoxOrderRecieptAction = () => {
    return {
        type: TYPES.RESET_ORDER_RECIEPT,
    };
};
export const orderLoadingAction = () => {
    return {
        type: TYPES.LOADING_ORDERS,
    };
};

export const getOrderHistoryAction = (userId, page = 1, limit = 10) => async (dispatch) => {
    const url = `/api/order/user/${userId}?page=${page}&limit=${limit}`;

    try {

        dispatch(detoxOrderAction());
        dispatch(orderLoadingAction())
        const res = await axiosJWT.get(url);

        dispatch(fillupOrderAction(res.data));
        return {
            res: res.data,
            error: null,
        };
    } catch (e) {
        dispatch(detoxOrderAction());

        return {
            res: null,
            error: e,
        };
    }
};

export const getOrderRecieptAction = (orderId) => async (dispatch) => {
    const url = `/api/order/${orderId}/reciept`;


    try {
        dispatch(detoxOrderRecieptAction());
        const res = await axiosJWT.get(url);


        dispatch(fillupOrderRecieptAction(res.data));
        return {
            res: res.data,
            error: null,
        };
    } catch (e) {
        dispatch(detoxOrderRecieptAction());

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
        if (res)
            return {
                res, error: null
            }

    } catch (error) {
        // console.log("ERROR enrollUserInCourses", error)
        return {
            error, res: null
        }
    }


}
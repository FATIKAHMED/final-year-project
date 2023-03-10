import {
    //  axiosDEF,
    axiosJWT
} from 'utils/axios';
import * as TYPES from "redux/types";


export const fillupUserNotifications = (payload) => {
    const unreadCount = payload.reduce(
        (total, item) => (item.isRead === false ? total + 1 : total),
        0
    );
    const totalCount = payload.length
    return {
        type: TYPES.SET_USER_NOTIFICATIONS,
        payload: {
            data: payload,
            unreadCount,
            totalCount
        }
    }
}
export const detoxUserNotifications = () => {
    return {
        type: TYPES.RESET_USER_NOTIFICATIONS,
    }
}

export const getNotificationsAction = (userId) => async (dispatch) => {
    const url = `/api/notification/${userId}`

    try {
        const res = await axiosJWT.get(url)
        // console.log("RESPONSE notifications", res)
        dispatch(fillupUserNotifications(res.data))

    } catch (error) {
        dispatch(detoxUserNotifications())
        // console.log("ERROR notifications", error)
    }

}

export const markReadNotificationAction = (userId, notificationId) => async (dispatch) => {
    const url = `/api/notification/${userId}`

    try {

        const res = await axiosJWT.put(url, { notificationId })

        dispatch(fillupUserNotifications(res.data))

    } catch (error) {
        dispatch(detoxUserNotifications())
        // console.log("ERROR notifications", error)
    }

}

export const markReadAllNotificationAction = (userId) => async (dispatch) => {
    const url = `/api/notification/${userId}/all`

    try {

        const res = await axiosJWT.put(url)
        // console.log("markReadAllNotificationAction", res)
        dispatch(fillupUserNotifications(res.data))

    } catch (error) {
        // dispatch(detoxUserNotifications())
        // console.log("ERROR notifications", error)
    }

}
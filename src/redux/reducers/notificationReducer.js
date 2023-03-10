import * as TYPES from "redux/types";

const initialState = {
    all: [],
    unreadCount: 0,
    totalCount: 0,
};
export default function (state = initialState, { payload, type }) {
    switch (type) {
        case TYPES.SET_USER_NOTIFICATIONS:
            return {
                ...state,
                all: payload.data,
                unreadCount: payload.unreadCount,
                totalCount: payload.totalCount,
            };
        case TYPES.RESET_USER_NOTIFICATIONS:
            return {
                ...state,
                all: [],
                unreadCount: 0,
                totalCount: 0,

            };

        default:
            return state;
    }
}
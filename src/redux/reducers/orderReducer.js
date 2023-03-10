import * as TYPES from "redux/types";

const initialState = {
    history: [],
    totalCount: 0,
    reciept: {},
    loading: false,

};
export default function (state = initialState, { payload, type }) {
    switch (type) {
        case TYPES.GET_ORDERS:
            return {
                ...state,
                history: payload.data,
                totalCount: payload.totalCount,
                loading: false,
            };

        case TYPES.LOADING_ORDERS:
            return {
                ...state,
                loading: true,
            };
        case TYPES.RESET_ORDERS:
            return {
                ...state,
                history: [],
                totalCount: 0,
                loading: false,
            };
        case TYPES.GET_ORDER_RECIEPT:
            return {
                ...state,
                reciept: payload
            };
        case TYPES.RESET_ORDER_RECIEPT:
            return {
                ...state,
                reciept: {}
            };

        default:
            return state;
    }
}
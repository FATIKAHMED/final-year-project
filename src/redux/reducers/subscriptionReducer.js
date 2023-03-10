import * as TYPES from "redux/types";

const initialState = {
    prices: [],
    publicKey: null,
    subscription: null
};
export default function (state = initialState, { payload, type }) {
    switch (type) {
        case TYPES.GET_SUBSCRIPTIONS:
            return {
                ...state,
                prices: payload.prices,
            };
        case TYPES.GET_CONFIG:
            return {
                ...state,
                publicKey: payload.publishableKey
            };
        case TYPES.RESET_SUBSCRIPTIONS:
            return {
                ...state,
                prices: [],
            };
        case TYPES.RESET_CONFIG:
            return {
                ...state,
                publicKey: null,
            };
        case TYPES.ADD_SUBSCRIPTION:
            return {
                ...state,
                subscription: payload
            }
        case TYPES.RESET_ADDED_SUBSCRIPTION:
            return {
                ...state,
                subscription: null
            }
        default:
            return state;
    }
}
import {
    axiosDEF,
    axiosJWT
} from 'utils/axios';
import * as TYPES from "redux/types";
// import { ROLE } from "utils/constants";
import { store } from 'redux/store'

export const fillupSubscriptionAction = (res) => {
    const payload = res;

    return {
        type: TYPES.GET_SUBSCRIPTIONS,
        payload,
    };
};
export const fillupConfigAction = (res) => {
    const payload = res;

    return {
        type: TYPES.GET_CONFIG,
        payload,
    };
};


export const detoxSubscriptionAction = () => {
    return {
        type: TYPES.RESET_SUBSCRIPTIONS,
    };
};
export const detoxConfigAction = () => {
    return {
        type: TYPES.RESET_CONFIG,
    };
};


export const createSubscriptionAction = (customerId, priceId) => async (dispatch) => {
    const url = `/api/payment/create-subscription`
    const payload = { customerId, priceId }
    // console.log(payload)

    try {
        const res = await axiosJWT.post(url, payload);

        // dispatch(fillupSubscriptionAction(res.data));
        // console.log("createSubscriptionAction", res)
        return {
            res: res.data,
            error: null,
        };
    } catch (error) {
        return {
            res: null,
            error: error.response,
        };
    }

}

export const createCheckoutSessionAction = (customerId, priceId, mode = 'subscription', cartItemIds) => async (dispatch) => {
    const url = `/api/payment/create-checkout-session`
    const payload = { customerId, priceId, mode, cartItemIds }
    // console.log(payload)

    try {
        const res = await axiosJWT.post(url, payload);

        // dispatch(fillupSubscriptionAction(res.data));
        // console.log("createCheckoutSessionAction", res)
        window.location.replace(res.data.url)
        return {
            res: res.data,
            error: null,
        };
    } catch (error) {
        return {
            res: null,
            error: error.response,
        };
    }
}

export const getStripeConfigAction = () => async (dispatch) => {
    const url = `/api/payment/config`;


    try {
        const res = await axiosJWT.get(url);

        dispatch(fillupConfigAction(res.data));
        return {
            res: res.data,
            error: null,
        };

    } catch (e) {

        return {
            res: null,
            error: e.response,
        };
    }
};

export const getStripeSubscriptionPlanAction = () => async (dispatch) => {
    const url = `/api/payment/stripe/plans`;


    try {
        const res = await axiosDEF.get(url);

        dispatch(fillupSubscriptionAction(res.data));
        return {
            res: res.data,
            error: null,
        };

    } catch (e) {

        return {
            res: null,
            error: e.response,
        };
    }
};

export const redirectToCustomerPortal = (sessionId) => async (dispatch) => {
    const url = `/api/payment/customer-portal`;

    const payload = { sessionId }

    try {
        const res = await axiosJWT.post(url, payload);

        // console.log("redirectToCustomerPortal res", res)
        window.location.replace(res.data.url)
        return {
            res: res.data,
            error: null,
        };

    } catch (e) {

        // console.log("redirectToCustomerPortal error", e)
        return {
            res: null,
            error: e.response,
        };
    }
}

export const subscribeUserToPlanAction = (sessionDetails) => async (dispatch) => {
    const userId = store.getState().auth.user._id;

    const url = `/api/payment/user/${userId}/subscribe`

    try {

        const payload = {
            stripe_subscriptionId: sessionDetails.subscription,
            stripe_sessionId: sessionDetails.id,
            stripe_status: sessionDetails.payment_status,
        }

        const res = await axiosJWT.put(url, payload)

        // console.log('res subscribeUserToPlanAction', res)
        if (res.status === 200 || res.status === 201) {
            dispatch(setUserSubscriptionAction(res.data))
            return {
                res: res.data,
                error: null
            }
        }
        else
            return {
                res: null,
                error: { message: 'Error subscribeUserToPlanAction' }
            }

    } catch (error) {
        console.error('Unable to subscribeUserToPlanAction', error.response)
        return {
            res: null,
            error: error.response
        }

    }

}

export const getStripeSessionDetailsAction = (stripe_sessionId) => async (dispatch) => {
    const url = `/api/payment/checkout-session?sessionId=${stripe_sessionId}`


    try {

        const res = await axiosJWT.get(url)

        // ? It have the subscription id of user which is paid
        // console.log('res getStripeSessionDetailsAction', res)

        if (res.status === 200 || res.status === 201) {
            return {
                res: res.data,
                error: null
            }
        }
        else
            return {
                res: null,
                error: { message: 'Error getting sesion details' }
            }

    } catch (error) {
        console.error('Unable to update user session id', error.response)
        return {
            res: null,
            error: error.response
        }

    }

}

export const setUserSubscriptionAction = (payload) => {
    return {
        type: TYPES.ADD_SUBSCRIPTION,
        payload
    }
}
export const getSubscriptionOfUserAction = (userId) => async dispatch => {
    const url = `/api/payment/user/${userId}/subscription`

    try {
        const res = await axiosJWT.get(url)
        // console.log("RES getSubscriptionOfUserAction", res)
        dispatch(setUserSubscriptionAction(res.data))
        return {
            res: res.data,
            error: null
        }
    } catch (error) {
        dispatch(detoxAddedSubscription())
        // console.log("ERR getSubscriptionOfUserAction", error)
        return {
            res: null,
            error
        }
    }
}
export const detoxAddedSubscription = () => {
    return {
        type: TYPES.RESET_ADDED_SUBSCRIPTION,
    };
}
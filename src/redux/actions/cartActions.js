import {
    //  axiosDEF,
    axiosJWT
} from 'utils/axios';
import * as TYPES from "redux/types";
// import { ROLE } from "utils/constants";

export const addCartItemAction = (itemId, buyable) => {

    return {
        type: TYPES.ADD_CART_ITEM,
        payload: {
            buyable,
            count: 1
        },
        meta: {
            throttle: 1000
        }
    };
};

export const removeCartItemAction = (itemId, price) => {
    return {
        type: TYPES.REMOVE_CART_ITEM,
        payload: {
            itemId,
            price
        },
        meta: {
            throttle: 1000
        }
    };
}

export const addFavouriteItemAction = (res) => {
    const payload = res;
    return {
        type: TYPES.ADD_FAVOURITE_ITEM,
        payload,
    };
}
export const getCartAction = (res) => {
    const payload = res;
    return {
        type: TYPES.GET_CART,
        payload,
    };
};


export const emptyCartAction = () => {
    return {
        type: TYPES.RESET_CART,
    };
};

export const stripeIntentClientSecretAction = (obj) => async dispatch => {

    const url = '/api/payment/create-payment-intent'
    // console.log("PAY AMOUNT ACTION", obj)


    try {
        const response = await axiosJWT.post(url, obj)


        // console.log("CHECKOUT response", response)
        return {
            res: response.data,
            error: null
        }
        // dispatch(showMessage(response.data.message));
    } catch (error) {
        return {
            res: null,
            error
        }
        // dispatch(showMessage(err.message));
    }
}
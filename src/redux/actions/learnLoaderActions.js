import * as TYPES from "redux/types";

export const setLearnLoading = (payload) => {

    return {
        type: TYPES.SET_LEARN_LOADING,
        payload
    };

}
export const resetLearnLoading = () => {
    return {
        type: TYPES.RESET_LEARN_LOADING,
    };
}
import {
    // axiosDEF,
    axiosJWT
} from "utils/axios";
import * as TYPES from "redux/types";
// import { ROLE } from "utils/constants";
// import isEmpty from "utils/is-empty";
import { getNextAndPrevItemsOfArray, sortArrayByDate } from "utils/misc";

export const setCurrentEnrol = (payload) => {
    return {
        type: TYPES.SET_CURRENT_ENROL,
        payload
    };
}
export const resetCurrentEnrol = () => {
    return {
        type: TYPES.RESET_CURRENT_ENROL,
    };
}

// export const updateEnrolProgressAction = ()
import * as TYPES from "redux/types";

const initialState = {
    theme: 1

};
export default function (state = initialState, { payload, type }) {
    switch (type) {
        case TYPES.CHANGE_THEME_TO_DARK:
            return { theme: 2 };
        case TYPES.CHANGE_THEME_TO_LIGHT:
            return { theme: 1 };
        default:
            return state;
    }
}
// import * as TYPES from "redux/types";

// const initialState = {
//     topic: {
//         id: null,
//         details: {}
//     }
// };
// export default function (state = initialState, { payload, type }) {
//     switch (type) {
//         case TYPES.SET_CURRENT_PREVIEW_TOPIC:
//             return {
//                 ...state,
//                 store: payload.store,
//                 bought: payload.bought,
//             };
//         case TYPES.RESET_CURRENT_PREVIEW_TOPIC:
//             return {
//                 ...state,
//                 store: [],
//                 bought: [],
//             };
//         case TYPES.GET_A_COURSE_DETAILS:
//             return {
//                 ...state,
//                 courseDetails: payload.courseDetails,
//                 courseDetailsTrailers: payload.courseDetailsTrailers
//             }
//         case TYPES.RESET_A_COURSE_DETAILS:
//             return {
//                 ...state,
//                 courseDetails: {},
//                 courseDetailsTrailers: [],
//             }
//         default:
//             return state;
//     }
// }
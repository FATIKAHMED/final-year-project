import axios from "axios";
import { axiosDEF, axiosJWT } from "utils/axios";
import * as TYPES from "redux/types";
import { ROLE } from "utils/constants";
import isEmpty from "utils/is-empty";

export const detoxAction = () => {
    return {
        type: TYPES.RESET_CATEGORY_STORE,
    };
};

export const getCategoriesListAction = (page, limit) => async (dispatch) => {
    const url = `/api/category/list?page=${page}&limit=${limit}`;

    try {
        const res = await axiosDEF.get(url);

        dispatch(setCategoriesAction(res.data));

        return {
            res: res.data,
            error: null,
        };

    } catch (e) {
        dispatch(detoxAction());

        return {
            res: null,
            error: e,
        };
    }
};

export const removeCategoriesAction = () => async (dispatch) => {
    dispatch(detoxAction());
};

export const setCategoriesAction = (payload) => {
    return {
        type: TYPES.SET_CATEGORY_STORE,
        payload,
    };
};

// export const createCategoryAction = (payload) => async (dispatch) => {
//     const url = `/api/category`;

//     try {
//         const res = await axiosJWT.post(url, payload)

//         console.log('res createCategoryAction', res)

//         if (res.status === 200 || res.status === 201) {
//             return {
//                 res: res.data,
//                 error: null
//             }
//         }



//     } catch (error) {
//         console.error('Unable to create category', error.response)
//         return {
//             res: null,
//             error: error.response
//         }

//     }
// }

// export const updateCategoryAction = (payload, id) => async dispatch => {
//     const url = `/api/category/${id}`;

//     try {
//         console.log("updateCategoryAction", url, payload)
//         const res = await axiosJWT.put(url, payload)

//         console.log('res updateCategoryAction', res)

//         if (res.status === 200 || res.status === 201) {
//             dispatch(getCategoriesListAction())
//             return {
//                 res: res.data,
//                 error: null
//             }
//         }
//         else
//             return {
//                 res: null,
//                 error: { message: 'Error updating category' }
//             }

//     } catch (error) {
//         console.error('Unable to update category', error.response)
//         return {
//             res: null,
//             error: error.response
//         }

//     }

// }

// export const deleteCategoryAction = (id) => async dispatch => {
//     const url = `/api/category/${id}`

//     try {
//         const response = await axiosJWT.delete(url)

//         if (response.status === 200) {
//             dispatch(getCategoriesListAction())
//             return {
//                 res: response.data,
//                 error: null
//             }
//         }
//         else {
//             return {
//                 res: null,
//                 error: response.data
//             }
//         }
//     }
//     catch (error) {
//         console.log('error deleteCourseAction', error.response)
//         return {
//             res: null,
//             error
//         }
//     }

// }
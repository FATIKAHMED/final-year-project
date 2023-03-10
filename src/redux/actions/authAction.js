import axios from "axios";
import { axiosDEF, axiosJWT } from "utils/axios";
import * as TYPES from "redux/types";
import { ROLE } from "utils/constants";
import isEmpty from "utils/is-empty";
import { detoxAddedSubscription, detoxUsersAction } from "redux/actions";
import Cookies from 'js-cookie'
import { getCategoriesListAction } from "./categoryActions";
import { getStripeSubscriptionPlanAction } from "./subscriptionActions";
// import jwt_decode from "jwt-decode";

export const setBearerToken = (token) => {
  const bearerToken = `Bearer ${token}`;

  localStorage.setItem("token", bearerToken);
  axios.defaults.headers.common["Authorization"] = bearerToken;
};
export const resetBearerToken = () => {
  localStorage.removeItem("token");
  axios.defaults.headers.common["Authorization"] = null;
  // console.log("RESET BEARER TOKEN", axios.defaults.headers.common);

  /* if setting null does not remove `Authorization` header then try     
           delete axios.defaults.headers.common['Authorization'];
          */
};

export const authenticateAction = (res) => {
  // const { jwToken } = res;
  // const decoded = {}
  // jwt_decode(jwToken);

  const payload = res;
  return {
    type: TYPES.AUTHENTICATE,
    payload,
  };
};

export const deAuthenticateAction = () => {
  return {
    type: TYPES.DEAUTHENTICATE,
  };
};

export const restoreState = (authState) => {
  return {
    type: TYPES.RESTORE_AUTH_STATE,
    payload: authState,
  };
};

export const resetPasswordAction = (token, payload) => async (dispatch) => {
  const url = `/api/account/reset-password/${token}`;

  try {
    const res = await axiosDEF.put(url, payload);
    return {
      res: res?.data,
      status: res?.status,
      error: null,
    };
  } catch (e) {
    console.error(e);
    return {
      res: null,
      error: {
        formErrors: e.response?.data,
        status: e.response?.status,
      },
    };
  }
};
export const forgotPasswordAction = (payload) => async (dispatch) => {
  const url = `/api/account/forgot-password`;

  try {
    const res = await axiosDEF.post(url, payload);
    return {
      res: res?.data,
      status: res?.status,
      error: null,
    };
  } catch (e) {
    return {
      res: null,
      error: {
        formErrors: e.response?.data,
        status: e.response?.status,
      },
    };
  }
};

export const updatePasswordAction = (payload) => async (dispatch) => {
  const url = `/api/account/update-password`;

  try {
    const res = await axiosJWT.put(url, payload);
    return {
      res: res.data,
      error: null,
    };
  } catch (e) {
    return {
      res: null,
      error: {
        formErrors: e.response.data,
        status: e.response.status,
      },
    };
  }
};
export const checkUserSessionAction = () => async (dispatch) => {
  const url = `/api/account/check/session`;

  try {

    const res = await axiosJWT.get(url);

  } catch (e) {

  }
}
export const loginUser = (payload) => async (dispatch) => {
  const url = `/api/account/login`;

  try {
    dispatch(deAuthenticateAction());

    const res = await axiosDEF.post(url, payload);
    // console.log("LOGIN RES", res)
    // console.log("LOGIN RES", res.headers, Cookies.get('refreshToken'));

    dispatch(authenticateAction(res.data));
    return {
      res: res.data,
      error: null,
    };
  } catch (e) {
    dispatch(deAuthenticateAction());
    return {
      res: null,
      error: e.response,
    };
  }
};
export const uploadUserProfilePictureAction = data => async dispatch => {
  const url = `/api/account/upload-profile-pic`;

  try {
    const res = await axiosJWT.post(url, data);
    // console.log("uploadUserProfilePictureAction RES", res);

    return {
      res: res.data.picture.location,
      error: null,
    };
  } catch (e) {
    return {
      res: null,
      error: e.response,
    };
  }
}

export const updateProfile = (payload) => {
  return {
    type: TYPES.UPDATE_USER_PROFILE,
    payload,
  };
}

export const updateUserProfileAction = (id, data) => async dispatch => {
  const url = `/api/account/${id}/update-profile`;

  try {

    const res = await axiosJWT.put(url, data);
    // console.log("updateUserProfileAction RES", res);

    const reduxPayload = {
      firstName: data.firstName,
      lastName: data.lastName,
      picture: data.picture
    }

    dispatch(updateProfile(reduxPayload));

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
}
export const updateUserTopicProgressDetailsAction = (payload) => {
  return {
    type: TYPES.UPDATE_USER_TOPIC_PROGRESS,
    payload,
  };
};
export const registerUser = (payload) => async (dispatch) => {
  const referralCode = localStorage.getItem("referralCode");
  let url = "";

  if (isEmpty(referralCode)) url = `/api/account/register`;
  else {
    url = `/api/account/register/r/${referralCode}`;
  }

  // Rename payload object keys
  payload["password2"] = payload["confirmPassword"];
  delete payload.confirmPassword;

  // Add default role property = Student
  if (isEmpty(payload.role)) payload.role = ROLE.Student;

  // console.log("REGISTER USER ACTION::", url, payload);

  try {
    dispatch(deAuthenticateAction());
    const res = await axiosDEF.post(url, payload);
    localStorage.removeItem("referralCode", referralCode);
    return {
      res: res.data,
      error: null,
    };
  } catch (error) {
    dispatch(deAuthenticateAction());
    return {
      res: null,
      error: error.response,
    };
  }
};
export const checkCourseAccessAction =
  (userId, courseId) => async (dispatch) => {
    const url = `/api/account/course-access/${userId}/${courseId}`;

    try {
      const res = await axiosJWT.get(url);
      // console.log("rescheckCourseAccessAction-->", res)
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
export const updateUserUnlocks = (payload) => {
  return {
    type: TYPES.UPDATE_USER_UNLOCKS,
    payload
  }
}
export const subtractVideoUnlockPoints = (userId, action = "-") => async dispatch => {
  const url = `/api/unlock/user/${userId}`
  const payload = { action }
  try {
    const res = await axiosJWT.put(url, payload)
    dispatch(updateUserUnlocks(res.data))
  } catch (error) {
    // console.log("subtractVideoUnlockPoints ERROR", error)
  }
}

// export const mockLoginStudent = () => dispatch => {
//     dispatch(deAuthenticateAction());
//     dispatch({
//         type: TYPES.AUTHENTICATE,
//         payload: {
//             user: { name: "Muzammil", role: ROLE.Student },
//             token: 'Bearer asdlksand'
//         }
//     });

// }

// export const updateUserStripeSessionIdAction = (payload, id) => async (dispatch) => {
//     const url = `/api/account/user-stripe-sessionId/${id}`

//     try {
//         console.log("updateUserStripeSessionIdAction", url, payload)
//         const res = await axiosJWT.put(url, payload)

//         console.log('res updateUserStripeSessionIdAction', res)

//         if (res.status === 200 || res.status === 201) {
//             // dispatch(getUsersAction())

//             dispatch({
//                 type: TYPES.UPDATE_USER_STRIPE_SESSION_ID,
//                 payload
//             })
//             dispatch(getStripeSessionDetailsAction(payload.stripe_sessionId))
//             return {
//                 res: res.data,
//                 error: null
//             }
//         }
//         else
//             return {
//                 res: null,
//                 error: { message: 'Error updating user session id' }
//             }

//     } catch (error) {
//         console.error('Unable to update user session id', error.response)
//         return {
//             res: null,
//             error: error.response
//         }

//     }

// }

export const logout = () => async (dispatch) => {
  dispatch(deAuthenticateAction());
  dispatch(detoxAddedSubscription());
  dispatch(detoxUsersAction());
  localStorage.removeItem('consentUnlockUsage')
  dispatch(bootstrapAppApis())
  return { type: "SIGNOUT_REQUEST" }
};

export const restore = (savedState) => (dispatch) => {
  dispatch(restoreState(savedState));
};

export const bootstrapAppApis = () => async (dispatch) => {
  dispatch(getCategoriesListAction(1, 10));
  dispatch(getStripeSubscriptionPlanAction());
}


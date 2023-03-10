// import axios from "axios";
import {
  // axiosDEF,
  axiosJWT
} from "utils/axios";
import * as TYPES from "redux/types";
import { ROLE } from "utils/constants";
import isEmpty from "utils/is-empty";

export const detoxUsersAction = () => {
  return {
    type: TYPES.RESET_USER_STORE,
  };
};

export const getBusinessUsersAction = (userId, role, businessId, page = 1, limit = 10) => async (dispatch) => {

  let url = `/api/account/${userId}/business-users/${businessId}?limit=${limit}&page=${page}`;

  if (role)
    url = `/api/account/${userId}/business-users/${businessId}?role=${role}&limit=${limit}&page=${page}`;

  try {
    const res = await axiosJWT.get(url);
    // console.log("RESPONSE getBusinessUsersAction", res)

    const payload = res.data

    if (role === ROLE.BusinessStudent)
      dispatch(setStudentUsersAction(payload))

    if (role === ROLE.BusinessManager)
      dispatch(setEmployeeUsersAction(payload))

    if (isEmpty(role))
      dispatch(setUsersAction(payload));


    return {
      res: res.data,
      error: null,
    };

  } catch (e) {

    // console.log("RESPONSE getBusinessUsersAction", e)
    return {
      res: null,
      error: e,
    };
  }
};



export const updateUserBusinessCourseAccessAction = (payload) => async dispatch => {
  const url = `/api/business/course-access/`


  try {
    const res = await axiosJWT.put(url, payload)

    // console.log('res updateUserBusinessCourseAccessAction', res)

    if (res.status === 200 || res.status === 201) {

      return {
        res: res.data,
        error: null
      }
    }
    else
      return {
        res: null,
        error: { message: 'Error updating course access' }
      }

  } catch (error) {
    console.error('error updateUserBusinessCourseAccessAction', error.response)
    return {
      res: null,
      error: error.response
    }

  }
}


export const createNewUserAction = (userId, requestPayload) => async (dispatch) => {

  let url = `/api/account/${userId}/business-user-create`;

  requestPayload.password2 = requestPayload.password

  try {
    const res = await axiosJWT.post(url, requestPayload);
    // console.log("RESPONSE createNewEmployeeAction", res)


    // if (role === ROLE.BusinessStudent)
    //   dispatch(setStudentUsersAction(payload))

    // if (role === ROLE.BusinessManager)
    //   dispatch(setEmployeeUsersAction(payload))

    // if (isEmpty(role))
    //   dispatch(setUsersAction(payload));


    return {
      res: res.data,
      error: null,
    };

  } catch (e) {

    // console.log("RESPONSE createNewEmployeeAction", e)
    return {
      res: null,
      error: e,
    };
  }
};


export const updateUserAction = (payload, id) => async (dispatch) => {
  const url = `/api/account/user/${id}`


  try {
    // console.log("updateUserAction", url, payload)
    const res = await axiosJWT.put(url, payload)

    // console.log('res updateUserAction', res)

    if (res.status === 200 || res.status === 201) {
      // await dispatch(getBusinessUsersAction())
      return {
        res: res.data,
        error: null
      }
    }
    else
      return {
        res: null,
        error: { message: 'Error updating user' }
      }

  } catch (error) {
    console.error('Unable to update user', error.response)
    return {
      res: null,
      error: error.response
    }

  }

}


export const deleteUserAction = (userId) => async dispatch => {
  const url = `/api/account/user/${userId}`

  try {
    const response = await axiosJWT.delete(url)

    if (response.status === 200) {
      dispatch(getBusinessUsersAction())
      return {
        res: response.data,
        error: null
      }
    }
    else {
      return {
        res: null,
        error: response.data
      }
    }
  }
  catch (error) {
    // console.log('error deleteuserAction', error.response)
    return {
      res: null,
      error
    }
  }

}


export const setStudentUsersAction = (payload) => {
  return {
    type: TYPES.SET_STUDENTS_USER_STORE,
    payload,
  };
};
export const setEmployeeUsersAction = (payload) => {
  return {
    type: TYPES.SET_EMPLOYEES_USER_STORE,
    payload,
  };
};
export const setUsersAction = (payload) => {
  return {
    type: TYPES.SET_USER_STORE,
    payload,
  };
};


export const updateUserStatusAction = (userId, status) => async (dispatch) => {
  const url = `/api/account/status/user/${userId}`;

  try {
    const res = await axiosJWT.put(url, { status });

    if (res.status === 200) {

      await dispatch(getBusinessUsersAction());

      return {
        res: res.data,
        error: null,
      };
    }


  } catch (e) {
    return {
      res: null,
      error: e,
    };
  }
};

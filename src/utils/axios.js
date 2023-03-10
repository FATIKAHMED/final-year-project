import { BASE_URL } from "utils/constants";
import axios from "axios"
import { store } from 'redux/store'
import { logout, authenticateAction } from 'redux/actions'
const axiosJWT = axios.create();
const axiosDEF = axios.create();

const token = localStorage.getItem("token");
let count = 0;
const logoutSessionExpired = () => {
    store.dispatch(logout())
    // console.log("count-->", count)
    // if sessionExpired false
    //// if (!(window.localStorage.getItem("sessionExpired")) || count <= 1) {
    if (count == 0) {
        store.dispatch({
            type: 'TOAST',
            payload: {
                type: 'error',
                message: 'Your session has expired'
            }
        })
    }

    //// window.localStorage.setItem("sessionExpired", true)
    // localstorage write sessionExpired true
    const url = window.location.protocol + "//" + window.location.host + "/login"
    // console.log("logoutSessionExpired", url)
    count += 1
    window.location.replace(url);

}

const updateAccessToken = (data) => {
    store.dispatch(authenticateAction(data))
}

axiosDEF.interceptors.request.use(
    async (config) => {
        config.withCredentials = true;
        config.url = BASE_URL + config.url;
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

axiosDEF.interceptors.response.use((response) => {
    return response
}, async function (error) {
    if (error.response.data.message?.includes("Either token is missing or it is revoked") || error.response.data.message?.includes("Refresh token expired")) {
        window.localStorage.setItem("sessionExpired", false)

        logoutSessionExpired()

        return Promise.reject(error);
    }
    return Promise.reject(error);

})


axiosJWT.interceptors.request.use(
    async (config) => {
        const token = store.getState().auth.tokens.accessToken
        config.withCredentials = true;
        config.headers = {
            Authorization: `Bearer ${token}`,
        };
        config.url = BASE_URL + config.url;
        return config;
    },
    (error) => {

        Promise.reject(error);
    }
);

axiosJWT.interceptors.response.use((response) => {
    return response
}, async function (error) {
    const originalRequest = error.config;

    if (error.response.status === 403 || error.response.statusText === "Forbidden") {
        window.localStorage.setItem("sessionExpired", false)

        logoutSessionExpired()
        return Promise.reject(error);
    }


    if (error.response.data.message === 'jwt expired' && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const url = '/api/account/refresh-token'
        // const payload = { token: store.getState().auth.tokens.refreshToken }

        const res = await axiosDEF.post(url);
        // const access_token = res.data.token
        const access_token = 'Bearer ' + res.data.tokens.accessToken

        axios.defaults.headers.common['Authorization'] = access_token;
        originalRequest.headers.Authorization = access_token;
        // UPDATE USER TOKEN
        updateAccessToken(res.data)
        return axios(originalRequest);
    }

    return Promise.reject(error);
});


export { axiosDEF, axiosJWT };
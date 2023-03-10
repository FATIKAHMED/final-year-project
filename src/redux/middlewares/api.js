const api = ({ getState, dispatch }) => next => action => {
    // console.log("STORE API MIDDLEWARE", getState())
    if (action.type !== "API") {
        return next(action)
    }

    // code axios api here
    // const { url, success } = action.payload
    // axios.get(url).then((response) => dispatch(success(response)))

    next(action)

}
export default api
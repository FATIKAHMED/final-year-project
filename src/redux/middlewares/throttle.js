const throttled = {}

const throttle = ({ getState, dispatch }) => next => action => {
    const time = action.meta && action.meta.throttle
    if (!time) {
        return next(action)
    }

    // Ignore the action if its already throttled
    if (throttled[action.type]) {
        return
    }

    throttled[action.type] = true
    setTimeout(() => {
        throttled[action.type] = false
    }, time);

    return next(action)
}
export default throttle
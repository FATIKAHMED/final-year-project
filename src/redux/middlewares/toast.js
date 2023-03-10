import { toast } from "react-toastify";
import { FaCheck, FaTimes } from "react-icons/fa";

const Toast = ({ getState, dispatch }) => next => action => {
    const { payload } = action

    if (action.type !== "TOAST") {
        return next(action)
    }

    switch (payload.type) {
        case 'success':
            toast.dark(payload.message, {
                // sharpGreen
                progressStyle: { background: '#4fd419 !important' }
            });
            break;
        case 'error':
            toast.dark(payload.message, {
                progressStyle: { background: 'crimson' }
            });
            break;
        default:
            toast.dark(payload.message);
            break;
    }

    next(action)

}
export default Toast
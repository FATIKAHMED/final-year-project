import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localstorage
import * as TYPES from 'redux/types'
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import courseReducer from "./courseReducer";
import cartReducer from "./cartReducer";
import lessonReducer from "./lessonReducer";
import topicReducer from "./topicReducer";
import orderReducer from "./orderReducer";
import subscriptionReducer from "./subscriptionReducer";
import searchReducer from "./searchReducer";
import notificationReducer from "./notificationReducer";
import questionReducer from "./topicQuestionReducer";
import businessReducer from "./businessReducer";
import categoryReducer from "./categoryReducer";
import enrolReducer from "./enrolReducer";
import learnLoaderReducer from "./learnLoaderReducer";

const persistConfig = {
    key: 'root',
    storage,
    // whitelist: ['reducerName']  // reducer which i want to persist goes here (can be more than one)
}

const appReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    category: categoryReducer,
    business: businessReducer,
    courses: courseReducer,
    cart: cartReducer,
    lesson: lessonReducer,
    topic: topicReducer,
    notification: notificationReducer,
    search: searchReducer,
    subscription: subscriptionReducer,
    order: orderReducer,
    question: questionReducer,
    enrol: enrolReducer,
    learnLoader: learnLoaderReducer,
})

const rootReducer = (state, action) => {
    if (action.type === TYPES.RESET_USER_STORE) {
        localStorage.removeItem('persist:root')
        state = undefined

        // const { users, comment } = state;
        // state = { users, comment };
    }
    return appReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer);
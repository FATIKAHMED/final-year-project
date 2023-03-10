import * as TYPES from "redux/types";

const initialState = {
    isAuthenticated: false,
    user: {},
    tokens: null
};
export default function (state = initialState, action) {
    switch (action.type) {
        case TYPES.USER_CONTENT_PROGRESS_UPDATE:
            // console.log("User Progress reducer", action.payload, state.user.contentProgress);
            return {
                ...state,
                user: { ...state.user, contentProgress: action.payload }
            }
        case TYPES.UPDATE_USER_TOPIC_PROGRESS:
            return {
                ...state,
                user: { ...state.user, contentProgress: action.payload }
            }
        case TYPES.ADD_SUBSCRIPTION:
            return {
                ...state,
                user: { ...state.user, subscription: action.payload },
            }

        case TYPES.UPDATE_USER_STRIPE_SESSION_ID:
            const { stripe_sessionId } = action.payload
            return {
                ...state,
                user: { ...state.user, stripe_sessionId }
            }

        case TYPES.AUTHENTICATE:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                tokens: action.payload.tokens,
            };
        case TYPES.DEAUTHENTICATE:
            return {
                ...state,
                isAuthenticated: false,
                user: {},
                tokens: null
            };
        case TYPES.RESTORE_AUTH_STATE:
            return {
                ...state,
                isAuthenticated: false,
                user: action.payload.user,
                tokens: action.payload.tokens,
            };
        case TYPES.UPDATE_USER_PROFILE:
            return {
                ...state,
                user: {
                    ...state.user,
                    picture: action.payload.picture,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName
                }
            }
        case TYPES.UPDATE_USER_UNLOCKS:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload
                }
            }
        default:
            return state;
    }
}
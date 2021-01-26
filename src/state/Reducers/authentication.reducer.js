import { LOGIN_AS_GUEST, LOGIN_START, LOGIN_SUCCEEDED, LOGIN_FAIL, LOGIN_CANCELLED, LOGOUT_START, LOGOUT_SUCCEED } from '../Actions/actionTypes';

const initialState = {
    guest: false,
    isSignedIn: false,
    isWaiting: false,
    user: {},
}

const authentication = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_AS_GUEST:
            return { ...state, guest: true };
        case LOGIN_START:
            return { ...state, isWaiting: true }
        case LOGIN_SUCCEEDED:
            return { ...state, guest: false, isSignedIn: true, isWaiting: false, user: action.payload };
        case LOGIN_FAIL:
            return { initialState };
        case LOGIN_CANCELLED:
            return { initialState };
        case LOGOUT_START:
            return { ...state, isSignedIn: false, user: {} };
        default:
            return state;
    }
}

export default authentication;
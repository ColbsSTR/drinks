import { LOGIN_AS_GUEST, LOGIN_SUCCEEDED } from '../Actions/actionTypes';

const initialState = {
    guest: false,
    isSignedIn: false,
    user: {},
}

const authentication = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_AS_GUEST:
            return { ...state, guest: true };
        case LOGIN_SUCCEEDED:
            return { ...state, guest: false, isSignedIn: true, user: action.payload };
        default:
            return state;
    }
}

export default authentication;
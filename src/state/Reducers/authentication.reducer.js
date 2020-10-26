import { LOGIN_AS_GUEST } from '../Actions/actionTypes';

const initialState = {
    guest: false,
    user: [],
}

const authentication = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_AS_GUEST:
            return { ...state, guest: true };
        default:
            return state;
    }
}

export default authentication;
import { LOGIN_AS_GUEST, LOGIN_SUCCEEDED } from './actionTypes';

export const loginAsGuest = () => {
    return {
        type: LOGIN_AS_GUEST,
    }
}

export const loginSucceeded = (data) => {
    console.tron.log('data from login', data);
    return {
        type: LOGIN_SUCCEEDED,
        payload: data,
    }
}
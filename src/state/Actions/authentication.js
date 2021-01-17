import { LOGIN_START, LOGIN_AS_GUEST, LOGIN_SUCCEEDED, LOGIN_FAIL, LOGIN_CANCELLED } from './actionTypes';

export const loginAsGuest = () => {
    return {
        type: LOGIN_AS_GUEST,
    }
}

export const login = () => {
    return {
        type: LOGIN_START,
    }
}

export const loginSucceeded = (data) => {
    return {
        type: LOGIN_SUCCEEDED,
        payload: data,
    }
}

export const loginFail = (data) => {
    return {
        type: LOGIN_FAIL,
        payload: data,
    }
}

export const loginCancelled = () => {
    return {
        type: LOGIN_CANCELLED,
    }
}
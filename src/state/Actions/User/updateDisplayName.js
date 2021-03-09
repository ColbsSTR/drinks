import { 
    UPDATE_USER_DISPLAY_NAME, 
    UPDATE_USER_DISPLAY_NAME_START, 
    UPDATE_USER_DISPLAY_NAME_SUCCEED, 
    UPDATE_USER_DISPLAY_NAME_FAIL 
} from '../actionTypes';

export const updateUserDisplayName = (data) => {
    return {
        type: UPDATE_USER_DISPLAY_NAME,
        payload: data,
    }
}

export const start = () => {
    return {
        type: UPDATE_USER_DISPLAY_NAME_START
    }
}

export const succeed = (data) => {
    return {
        type: UPDATE_USER_DISPLAY_NAME_SUCCEED,
        payload: data,
    }
}

export const fail = (data) => {
    return {
        type: UPDATE_USER_DISPLAY_NAME_FAIL,
        payload: data,
    }
}
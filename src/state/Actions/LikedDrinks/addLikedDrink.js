import { 
    ADD_LIKED_DRINK, 
    ADD_LIKED_DRINK_START, 
    ADD_LIKED_DRINK_SUCCEED, 
    ADD_LIKED_DRINK_FAIL,
} from '../actionTypes';

export const addLikedDrink = (data) => {
    return {
        type: ADD_LIKED_DRINK,
        payload: data,
    }
}

export const start = () => {
    return {
        type: ADD_LIKED_DRINK_START
    }
}

export const succeed = () => {
    return {
        type: ADD_LIKED_DRINK_SUCCEED,
    }
}

export const fail = (data) => {
    return {
        type: ADD_LIKED_DRINK_FAIL,
        payload: data,
    }
}
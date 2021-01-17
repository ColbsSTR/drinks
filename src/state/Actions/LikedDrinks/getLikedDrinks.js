import { GET_LIKED_DRINKS, GET_LIKED_DRINKS_START, GET_LIKED_DRINKS_SUCCEED, GET_LIKED_DRINKS_FAIL } from '../actionTypes';

export const getLikedDrinks = () => {
    return {
        type: GET_LIKED_DRINKS
    }
}

export const start = () => {
    return {
        type: GET_LIKED_DRINKS_START
    }
}

export const succeed = (data) => {
    return {
        type: GET_LIKED_DRINKS_SUCCEED,
        payload: data,
    }
}

export const fail = (data) => {
    return {
        type: GET_LIKED_DRINKS_FAIL,
        payload: data,
    }
}
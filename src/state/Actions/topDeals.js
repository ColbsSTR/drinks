import { GET_TOPDEALS, GET_TOPDEALS_START, GET_TOPDEALS_SUCCEED, GET_TOPDEALS_FAIL } from './actionTypes';

export const getTopDeals = () => {
    return {
        type: GET_TOPDEALS
    }
}

export const start = () => {
    return {
        type: GET_TOPDEALS_START
    }
}

export const succeed = (data) => {
    return {
        type: GET_TOPDEALS_SUCCEED,
        payload: data,
    }
}

export const fail = (data) => {
    return {
        type: GET_TOPDEALS_FAIL,
        payload: data,
    }
}
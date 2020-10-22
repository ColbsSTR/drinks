import { GET_VENUEINFORMATION, GET_VENUEINFORMATION_START, GET_VENUEINFORMATION_SUCCEED, GET_VENUEINFORMATION_FAIL } from './actionTypes';

export const getVenueInformation = (docId) => {
    return {
        type: GET_VENUEINFORMATION,
        payload: docId
    }
}

export const start = () => {
    return {
        type: GET_VENUEINFORMATION_START
    }
}

export const succeed = (data) => {
    return {
        type: GET_VENUEINFORMATION_SUCCEED,
        payload: data,
    }
}

export const fail = (data) => {
    return {
        type: GET_VENUEINFORMATION_FAIL,
        payload: data,
    }
}
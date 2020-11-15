import { WRITE_REVIEW, WRITE_REVIEW_START, WRITE_REVIEW_SUCCEED, WRITE_REVIEW_FAIL } from './actionTypes';

//when calling this just need to pass { docId: '', reviewData: 5 } to payload
export const writeReview = (data) => {
    return {
        type: WRITE_REVIEW,
        payload: data,
    }
}

export const start = () => {
    return {
        type: WRITE_REVIEW_START,
    }
}

export const succeed = () => {
    return {
        type: WRITE_REVIEW_SUCCEED,
    }
}

export const fail = () => {
    return {
        type: WRITE_REVIEW_FAIL,
    }
}
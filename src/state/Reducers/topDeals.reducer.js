import { GET_TOPDEALS_START, GET_TOPDEALS_SUCCEED, GET_TOPDEALS_FAIL } from '../Actions/actionTypes';

const initialState = {
    isWaiting: false,
    deals: [],
}

const topDeals = (state = initialState, action) => {
    switch(action.type) {
        case GET_TOPDEALS_START:
            return { ...state, isWaiting: true };
        case GET_TOPDEALS_SUCCEED:
            return { ...state, isWaiting: false, deals: action.payload };
        case GET_TOPDEALS_FAIL:
            return { ...state, isWaiting: false, error: action.payload };
        default:
            return state
    }
}

export default topDeals;
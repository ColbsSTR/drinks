import { REMOVE_LIKED_DRINK_START, REMOVE_LIKED_DRINK_SUCCEED, REMOVE_LIKED_DRINK_FAIL } from '../../Actions/actionTypes';

const initialState = {
    isWaiting: false,
    error: null,
}

const removeLikedDrink = (state = initialState, action) => {
    switch(action.type) {
        case REMOVE_LIKED_DRINK_START:
            return { ...state, isWaiting: true };
        case REMOVE_LIKED_DRINK_SUCCEED:
            return { ...state, isWaiting: false };
        case REMOVE_LIKED_DRINK_FAIL:
            return { ...state, isWaiting: false, error: action.payload };
        default:
            return state;
    }
}

export default removeLikedDrink;
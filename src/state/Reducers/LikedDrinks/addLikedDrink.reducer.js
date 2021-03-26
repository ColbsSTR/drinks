import { ADD_LIKED_DRINK_START, ADD_LIKED_DRINK_SUCCEED, ADD_LIKED_DRINK_FAIL } from '../../Actions/actionTypes';

const initialState = {
    isWaiting: false,
    error: null,
}

const addLikedDrink = (state = initialState, action) => {
    switch(action.type) {
        case ADD_LIKED_DRINK_START:
            return { ...state, isWaiting: true };
        case ADD_LIKED_DRINK_SUCCEED:
            return { ...state, isWaiting: false };
        case ADD_LIKED_DRINK_FAIL:
            return { ...state, isWaiting: false, error: action.payload };
        default:
            return state;
    }
}

export default addLikedDrink;
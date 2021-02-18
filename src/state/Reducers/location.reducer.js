import { SET_LOCATION } from '../Actions/actionTypes';

const initialState = {
    currentLocation: null,
}

const location = (state = initialState, action) => {
    switch(action.type) {
        case SET_LOCATION:
            const { currentLocation } = action.payload;
            return { ...state, currentLocation };
        default:
            return state
    }
}

export default location;
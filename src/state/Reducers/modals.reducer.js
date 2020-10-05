import { SHOW_MODAL, CLOSE_MODAL } from '../Actions/actionTypes';

const initialState = {
    showModal: false,
}

const modals = (state = initialState, action) => {
    switch(action.type) {
        case SHOW_MODAL:
            return { ...state, showModal: true };
        case CLOSE_MODAL:
            return { ...state, showModal: false};
        default:
            return state
    }
}

export default modals;
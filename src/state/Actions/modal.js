import { SHOW_MODAL, CLOSE_MODAL } from './actionTypes';

export const showModal = () => {
    return {
        type: SHOW_MODAL
    }
}

export const closeModal = () => {
    return {
        type: CLOSE_MODAL
    }
};
import {WRITE_REVIEW_START, WRITE_REVIEW_SUCCEED, WRITE_REVIEW_FAIL} from '../Actions/actionTypes';

const initialState = {
  isWaiting: false,
  error: null,
};

const reviews = (state = initialState, action) => {
  switch (action.type) {
    case WRITE_REVIEW_START:
      return {...state, isWaiting: true};
    case WRITE_REVIEW_SUCCEED:
      return {...state, isWaiting: false};
    case WRITE_REVIEW_FAIL:
      return {...state, isWaiting: false, error: action.payload};
    default:
      return state;
  }
};

export default reviews;

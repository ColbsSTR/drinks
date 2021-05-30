import {
  UPDATE_USER_DISPLAY_NAME_START,
  UPDATE_USER_DISPLAY_NAME_FAIL,
  UPDATE_USER_DISPLAY_NAME_SUCCEED,
} from '../../Actions/actionTypes';

const initialState = {
  isWaiting: false,
  error: null,
};

const updateDisplayName = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_DISPLAY_NAME_START:
      return {...state, isWaiting: true};
    case UPDATE_USER_DISPLAY_NAME_SUCCEED:
      return {...state, isWaiting: false};
    case UPDATE_USER_DISPLAY_NAME_FAIL:
      return {...state, isWaiting: false, error: action.payload};
    default:
      return state;
  }
};

export default updateDisplayName;

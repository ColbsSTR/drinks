import { takeLatest, put, call } from 'redux-saga/effects';
import { start, succeed, fail } from '../../Actions/User/updateDisplayName';
import { updateDisplayName } from '../../../services/Firebase/users';
import { UPDATE_USER_DISPLAY_NAME } from '../../Actions/actionTypes';

export function* updateUserDisplayNameWatcher() {
    yield takeLatest(UPDATE_USER_DISPLAY_NAME, updateUserDisplayNameWorker);
}

export function* updateUserDisplayNameWorker(action) {
    yield put(start());

    try {
        const updatedUser = yield call(updateDisplayName, action.payload);
        yield put(succeed(updatedUser));
    } catch (err) {
        yield put(fail(err));
        // **TODO**
        //Add error handling logic here. Modal, error toast, etc...
    }
}
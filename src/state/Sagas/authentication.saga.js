import { takeLatest, put, call } from 'redux-saga/effects';
import { LOGIN_START } from '../Actions/actionTypes';
import { loginSucceeded, loginFail, loginCancelled } from '../Actions/authentication';
import { loginWithFacebook } from '../../services/Firebase/authentication';
import { createNewUser, isNewUser } from '../../services/Firebase/users';

export function* authenticationWatcher() {
    yield takeLatest(LOGIN_START, authenticationWorker);
}

export function* authenticationWorker() {
    try {
        const user = yield call(loginWithFacebook);
        if (user) { //This check is for the case where the user presses cancel
            const newUser = yield call(isNewUser, user);
            if (newUser) {
                yield call(createNewUser, user);
            }
            yield put(loginSucceeded(user));
        } else {
            yield put(loginCancelled());
        }
    } catch(err) {
        yield put(loginFail(err));
        //***TODO*** modal??
    }
}
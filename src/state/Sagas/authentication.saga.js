import { Alert } from 'react-native';
import { takeLatest, put, call } from 'redux-saga/effects';
import { LOGIN_START, LOGOUT_START, LOGOUT_SUCCEED, RESET_DEALS } from '../Actions/actionTypes';
import { loginSucceeded, loginFail, loginCancelled } from '../Actions/authentication';
import { login, logout } from '../../services/Firebase/authentication';
import { createNewUser, isNewUser } from '../../services/Firebase/users';
import { emailInUse } from '../../language/keys/authentication/errorCodes';
import { errors } from '../../language/locales/login/errorStrings';

export function* authenticationWatcher() {
    yield takeLatest(LOGIN_START, loginWorker);
    yield takeLatest(LOGOUT_START, logoutWorker);
}

export function* loginWorker(action) {
    try {
        const { payload } = action;
        const user = yield call(login, payload);
        if (user) { //This check is for the case where the user presses cancel
            const newUser = yield call(isNewUser, user.user);
            if (newUser) {
                yield call(createNewUser, user.user);
            }
            yield put(loginSucceeded(user.user));
        } else {
            yield put(loginCancelled());
        }
    } catch(err) {
        yield put(loginFail(err));
        //***TODO*** modal
        if (err.code.toString() === emailInUse) {
            Alert.alert(
                errors.emailInUseHeader,
                errors.emailInUseDescription,
            );
        }
    }
}

export function* logoutWorker() {
    try {
        yield call(logout);
        yield put({ type: LOGOUT_SUCCEED });
        yield put({ type: RESET_DEALS });
    } catch(err) {
        //Not really sure what need to be done here
    }
}
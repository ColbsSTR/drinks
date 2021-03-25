import {takeLatest, call} from 'redux-saga/effects';
import {sendNotification} from '../../services/Firebase/sendNotification';
import {SEND_NOTIFICATION} from '../Actions/actionTypes';
import {showToast} from '../../components/Toast';

export function* sendNotificationWatcher() {
  yield takeLatest(SEND_NOTIFICATION, sendNotificationWorker);
}

export function* sendNotificationWorker(action) {
  try {
    yield call(sendNotification, action.payload);
    showToast('Notification sent!', 1250, '', 'success');
  } catch (err) {
    showToast(
      'Sorry, we had a problem sending the notification...',
      1500,
      'okay',
      'error',
    );
  }
}

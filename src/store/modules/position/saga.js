import { alert } from '../../../services/alert';
import { takeLatest, all, put, delay } from 'redux-saga/effects';

function* reset() {
    delay(1000);
    yield put({ type: 'RESET_REPORT' });
}

function* handleErrors({ error }) {
    alert('error', 'Erro', error.response.data.error);
}

export default all([
    takeLatest('GET_VEHICLES_ERROR', handleErrors),
    takeLatest('GET_LAST_POSITION_ERROR', handleErrors),
    takeLatest('GET_POSITIONS_ERROR', handleErrors),
    takeLatest('GET_REPORT_POSITIONS_ERROR', handleErrors),
    takeLatest('GET_REPORT_POSITIONS_SUCCESS', reset)
]);
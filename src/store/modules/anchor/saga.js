import { alert } from '../../../services/alert';
import { takeLatest, put, all } from 'redux-saga/effects';
import { getLastPosition } from '../position/action';

function* anchorSuccess({ response, meta: { requestAction: { imei } } }) {
    yield alert('success', 'Âncoragem', response.data.message);
    yield put(getLastPosition(imei));
}

function* handleErrors({ error }) {
    alert('error', 'Erro', error.response.data.error);
}

export default all([
    takeLatest('SET_ANCHOR_SUCCESS', anchorSuccess),
    takeLatest('SET_ANCHOR_ERROR', handleErrors)
]);
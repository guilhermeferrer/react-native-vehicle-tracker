import { alert } from '../../../services/alert';
import { takeLatest, put, all } from 'redux-saga/effects';

function* anchorSuccess({ response, meta: { requestAction: { active } } }) {
    yield alert('success', 'Âncoragem', response.data.message);
    yield put({ type: 'UPDATE_ANCHOR', active });
}

function* handleErrors({ error }) {
    alert('error', 'Erro', error.response.data.error);
}

export default all([
    takeLatest('SET_ANCHOR_SUCCESS', anchorSuccess),
    takeLatest('SET_ANCHOR_ERROR', handleErrors)
]);
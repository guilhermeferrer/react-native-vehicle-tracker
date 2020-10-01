import { alert } from '../../../services/alert';
import { takeLatest, put, all } from 'redux-saga/effects';
import { saveUser } from './action';

function* loginSuccess({ response }) {
    yield put(saveUser(response.data));
}

function* handleErrors({ error }) {
    alert('error', 'Erro', error.response.data.error);
}

export default all([
    takeLatest('LOGIN_SUCCESS', loginSuccess),
    takeLatest('LOGIN_ERROR', handleErrors),
    takeLatest('REGISTER_ERROR', handleErrors),
    takeLatest('REGISTER_SUCCESS', loginSuccess)
]);
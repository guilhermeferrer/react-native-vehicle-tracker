import { alert } from '../../../services/alert';
import { takeLatest, put, all } from 'redux-saga/effects';
import { saveUser } from './action';

function* handleErrors({ error }) {
    alert('error', 'Erro', error.response.data.error);
}

export default all([
    takeLatest('GET_ROUTES_ERROR', handleErrors)
]);
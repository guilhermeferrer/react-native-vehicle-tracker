import { alert } from '../../../services/alert';
import { takeLatest, all } from 'redux-saga/effects';

function* handleErrors({ error }) {
    alert('error', 'Erro', error.response.data.error);
}

export default all([
    takeLatest('GET_VEHICLES_ERROR', handleErrors),
    takeLatest('GET_LAST_POSITION_ERROR', handleErrors),
    takeLatest('GET_POSITIONS_ERROR', handleErrors)
]);
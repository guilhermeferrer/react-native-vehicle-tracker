import { takeLatest, put, all } from 'redux-saga/effects';
import { saveUsers } from './action';

function* getUserSuccess({ response }) {
    yield put(saveUsers(response.data));
    console.log(response.data);
}

function* getUserError({ error }) {
    console.log(error.response.data);
}

export default all([
    takeLatest('GET_USER_SUCCESS', getUserSuccess),
    takeLatest('GET_USER_ERROR', getUserError)
]);
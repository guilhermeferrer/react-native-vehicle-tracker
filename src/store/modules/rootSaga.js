import { all } from 'redux-saga/effects';

import user from './user/saga';
import vehicle from './vehicle/saga';
import position from './position/saga';
import anchor from './anchor/saga';
import routes from './routes/saga';

export default function* rootSaga() {
    return yield all([
        user,
        vehicle,
        position,
        anchor,
        routes
    ]);
}
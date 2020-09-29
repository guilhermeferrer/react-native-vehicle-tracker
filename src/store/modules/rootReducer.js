import { combineReducers } from 'redux';

import { requestsReducer } from './rootInterceptor';

import user from './user/reducer';
import vehicle from './vehicle/reducer';
import position from './position/reducer';

export default combineReducers({
    user,
    vehicle,
    position,
    requestsReducer
});
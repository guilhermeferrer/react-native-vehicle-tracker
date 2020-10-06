import { combineReducers } from 'redux';

import { requestsReducer } from './rootInterceptor';

import user from './user/reducer';
import vehicle from './vehicle/reducer';
import position from './position/reducer';
import anchor from './anchor/reducer';

export default combineReducers({
    user,
    vehicle,
    position,
    anchor,
    requestsReducer
});
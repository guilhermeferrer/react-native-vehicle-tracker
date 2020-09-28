import { combineReducers } from 'redux';

import { requestsReducer } from './rootInterceptor';

import user from './user/reducer';
import vehicle from './vehicle/reducer';

export default combineReducers({
    user,
    vehicle,
    requestsReducer
});
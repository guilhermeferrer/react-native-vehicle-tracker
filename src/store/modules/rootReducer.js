import { combineReducers } from 'redux';

import { requestsReducer } from './rootInterceptor';

import user from './user/reducer';

export default combineReducers({
    user,
    requestsReducer
});
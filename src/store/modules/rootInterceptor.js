import { handleRequests } from '@redux-requests/core';
import { createDriver } from '@redux-requests/axios';
import api from '../../services/api';

const { requestsMiddleware, requestsReducer } = handleRequests({
    driver: createDriver(api)
});

export { requestsMiddleware, requestsReducer };
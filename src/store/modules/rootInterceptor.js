import { handleRequests } from '@redux-requests/core';
import { createDriver } from '@redux-requests/axios';
import api from '../../services/api';

const { requestsMiddleware, requestsReducer } = handleRequests({
    driver: createDriver(api),
    onRequest: (request, action, store) => {
        const token = store.getState().user.token;

        return [{ ...request[0], headers: { "Authorization": `Bearer ${token}` } }];
    },
    onSuccess: (response) => {
        response.data = response.data[0];
        return response;
    }
});

export { requestsMiddleware, requestsReducer };
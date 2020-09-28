import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-community/async-storage';
import "regenerator-runtime/runtime";

import { requestsMiddleware } from './modules/rootInterceptor';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['user'],
    blacklist: ['vehicle']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers =
    (typeof window !== 'undefined' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(...requestsMiddleware, sagaMiddleware)),
);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export {
    store,
    persistor
}
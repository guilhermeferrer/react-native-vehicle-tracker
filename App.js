import React from 'react';

import { Provider } from 'react-redux';
import { store, persistor } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes';
import Alert from 'react-native-dropdownalert';
import { setDropDownAlert } from './src/services/alert';

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
      <Alert ref={setDropDownAlert} updateStatusBar={false} translucent />
    </NavigationContainer>
  );
}
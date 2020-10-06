import React, { useEffect } from 'react';

import { Provider } from 'react-redux';
import { store, persistor } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes';
import Alert from 'react-native-dropdownalert';
import { setDropDownAlert } from './src/services/alert';
import OneSignal from 'react-native-onesignal';

export default function App() {
  OneSignal.init('d185b020-8ded-446a-98a8-4945a9ef98ff');

  useEffect(() => {
    OneSignal.getTags((receivedTags) => {
      if (!receivedTags) return;

      const tags = Object.keys(receivedTags);

      tags.forEach(tag => OneSignal.deleteTag(tag));
    });
  }, []);

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
import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from '../store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PersistGate } from 'redux-persist/integration/react';

import Home from '../pages/Home';

export default function Routes() {

    const { Screen, Navigator } = createStackNavigator();

    return (
        <NavigationContainer>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Navigator
                        screenOptions={{
                            headerShown: false
                        }}
                    >
                        <Screen name='Home' component={Home} />
                    </Navigator>
                </PersistGate>
            </Provider>
        </NavigationContainer>
    );
}
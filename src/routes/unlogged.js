import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/Login';
import Register from '../pages/Register';

export default function Unlogged() {

    const { Screen, Navigator } = createStackNavigator();

    return (
        <Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Screen name='Login' component={Login} />
            <Screen name='Register' component={Register} />
        </Navigator>
    );
}
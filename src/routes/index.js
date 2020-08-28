import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from '../store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PersistGate } from 'redux-persist/integration/react';
import { TransitionPresets } from '@react-navigation/stack';

import Home from '../pages/Home';
import Map from '../pages/Map';
import Report from '../pages/Report';
import Login from '../pages/Login';

function cardStyleInterpolatorprops(props) {

    const { current: { progress } } = props;

    const { cardStyle } = TransitionPresets.ModalSlideFromBottomIOS.cardStyleInterpolator(props);

    return {
        cardStyle,
        overlayStyle: {
            opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.7],
                extrapolate: 'clamp',
            }),
        },
    };
}


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
                        initialRouteName="Login"
                    >
                        <Screen name='Home' component={Home} />
                        <Screen name='Map' component={Map} />
                        <Screen name='Login' component={Login} />
                        <Screen name='Report' component={Report}
                            options={{
                                ...TransitionPresets.ModalSlideFromBottomIOS,
                                cardStyleInterpolator: cardStyleInterpolatorprops,
                                cardStyle: {
                                    backgroundColor: 'transparent'
                                }
                            }}
                        />
                    </Navigator>
                </PersistGate>
            </Provider>
        </NavigationContainer>
    );
}

//<Screen name='Home' component={Home} />
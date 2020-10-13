import React from 'react';

import Vehicles from '../pages/Vehicles';
import Positions from '../pages/Positions';
import Map from '../pages/Map';
import Report from '../pages/Report';
import Routes from '../pages/Routes';

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

export default function Unlogged() {

    const { Screen, Navigator } = createStackNavigator();

    function cardStyleInterpolatorprops(props) {

        const { current: { progress } } = props;

        const { cardStyle } = TransitionPresets.ModalSlideFromBottomIOS.cardStyleInterpolator(props);

        return {
            cardStyle,
            overlayStyle: {
                opacity: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                    extrapolate: 'clamp',
                }),
            },
        };
    }

    return (
        <Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Screen name='Vehicles'
                component={Vehicles}
                options={TransitionPresets.FadeFromBottomAndroid}
            />
            <Screen name='Positions'
                component={Positions}
            />
            <Screen name='Map'
                component={Map}
            />
            <Screen name='Routes'
                component={Routes}
            />
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
    );
}
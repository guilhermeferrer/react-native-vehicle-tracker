import React, { useEffect } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useBackHandler } from '@react-native-community/hooks';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RectButton } from 'react-native-gesture-handler';

import {
    Container,
    Scroll,
    Title,
    Header,
    Icon,
    Content,
    Hidden,
    OptionsContainer,
    IconRow,
    OptionRow,
    OptionLabel
} from './styles';

import StatusBar from '../../components/StatusBar';
import Vehicle from '../../components/Vehicle';
import Loading from '../../components/Loading';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/modules/user/action';
import { getVehicles } from '../../store/modules/vehicle/action';

import { useSharedValue, useAnimatedStyle, withTiming, useDerivedValue, useAnimatedRef, runOnUI, measure } from 'react-native-reanimated';

export default function Vehicles({ navigation }) {

    const opened = useSharedValue(false);
    const translation = useSharedValue(0);
    const aRef = useAnimatedRef();
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.vehicle.loading);
    const vehicles = useSelector(state => state.vehicle.vehicles);

    const config = {
        duration: 200
    }

    const iconRotation = useDerivedValue(() => {
        return withTiming(opened.value ? -Math.PI : 0);
    });

    const style = useAnimatedStyle(() => {
        return {
            translateY: withTiming(translation.value, config),
        }
    });

    const hiddenViewStyle = useAnimatedStyle(() => {
        return {
            zIndex: opened.value ? 1 : withTiming(-5, config),
            opacity: withTiming(opened.value ? 1 : 0, config)
        }
    });

    const iconStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotate: `${iconRotation.value}rad`
                }
            ]
        }
    });

    useBackHandler(() => {
        if (opened.value && isFocused) {
            runOnUI(() => {
                'worklet';
                translation.value = 0;
                opened.value = !opened.value;
            })();
            return true;
        }
        return false;
    });

    useEffect(() => {
        dispatch(getVehicles());
    }, []);

    function handleLogout() {
        dispatch(logout());
    }

    return (
        <>
            <StatusBar backgroundColor={'#07C8F9'} />
            <Container>
                <TouchableWithoutFeedback
                    onPress={() => {
                        runOnUI(() => {
                            'worklet';
                            if (translation.value === 0)
                                translation.value = measure(aRef).height - 50;
                            else
                                translation.value = 0;

                            opened.value = !opened.value;
                        })();
                    }}
                >
                    <Header>
                        <>
                            <Title>VEÍCULOS</Title>
                            <Icon style={iconStyle} name='down' color='white' size={18} />
                        </>
                    </Header>
                </TouchableWithoutFeedback>
                {
                    loading ? <Loading /> :
                        <Content>
                            <Scroll style={style}>
                                {
                                    vehicles.map((vehicle, index) => (
                                        <Vehicle {...vehicle} key={index} />
                                    ))
                                }
                            </Scroll>
                            <Hidden style={hiddenViewStyle} ref={aRef}>
                                <OptionsContainer>
                                    <RectButton onPress={handleLogout}>
                                        <OptionRow>
                                            <IconRow>
                                                <Ionicons name='power-outline' color='white' size={20} />
                                                <OptionLabel>Sair</OptionLabel>
                                            </IconRow>
                                            <Icon name='right' color='white' size={14} />
                                        </OptionRow>
                                    </RectButton>
                                </OptionsContainer>
                            </Hidden>
                        </Content>
                }
            </Container>
        </>
    );
}
import React, { useEffect, useState } from 'react';
import StatusBar from '../../components/StatusBar';
import { useDimensions } from '@react-native-community/hooks';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/esm/locale';
import { useSelector } from 'react-redux';
import MapView, { Marker, Circle } from 'react-native-maps';

import { useSharedValue, useAnimatedStyle, useAnimatedGestureHandler, withSpring, repeat, withTiming, useAnimatedRef, withDecay, measure } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import io from 'socket.io-client';

import {
    Container,
    CardContainer,
    Info,
    Icon,
    Card,
    GoUpLabel,
    Plate,
    Row,
    Model,
    LastUpdate,
    CardHeader,
    Address,
    AddressRow,
    CarIcon
} from './styles';

const Map = ({ route }) => {
    const client = io('http://nextfood.kinghost.net:21621');
    const { params } = route;
    const [position, setPosition] = useState(params);
    const { plate, model, year, brand } = useSelector(state => state.vehicle.vehicle);

    const { latitude, longitude, imei, address, gps_date, realTime } = position;

    const { window: { height } } = useDimensions();
    const aRef = useAnimatedRef();

    const positionListener = () => client.on('position', newPosition => {
        setPosition({ ...position, ...newPosition });
    });

    const CLOSED = height - 50;
    const OPENED = height - 155;
    const translation = useSharedValue(CLOSED);
    const loopAnimation = useSharedValue(0);

    const options = {
        damping: 20,
        mass: 1,
        stiffness: 150,
        overshootClamping: false,
        restSpeedThreshold: 0.1,
        restDisplacementThreshold: 0.1
    };

    const gestureHandler = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            ctx.startY = translation.value;
        },
        onActive: (event, ctx) => {
            translation.value = ctx.startY + event.translationY;
        },
        onEnd: event => {
            if (event.translationY > 0) {
                translation.value = withDecay({
                    velocity: event.velocityY,
                    clamp: [0, CLOSED]
                });
            } else {
                if (translation.value < height - measure(aRef).height - 75)
                    translation.value = withSpring(height - measure(aRef).height - 75);
                else
                    translation.value = withDecay({
                        velocity: event.velocityY,
                        clamp: [height - measure(aRef).height - 75, 0]
                    });
            }
        }
    });

    const style = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: translation.value,
                }
            ]
        }
    });

    const iconStyle = useAnimatedStyle(() => {
        return {
            opacity: translation.value >= CLOSED - 30 ? 1 : 0,
            transform: [
                {
                    translateY: loopAnimation.value
                }
            ]
        }
    });

    useEffect(() => {
        loopAnimation.value = repeat(withTiming(5, { duration: 1000 }), 15, true);
        if (realTime) {
            positionListener();
            client.emit('join', imei);
        }

        return () => client.removeAllListeners();
    }, []);

    function getAnchorState() {
        const { events_config } = position;

        if (!events_config)
            return false;
        if (!events_config.anchor)
            return false;
        return events_config.anchor.active;
    }

    function getAnchor() {
        const { events_config } = position;

        const [longitude, latitude] = events_config.anchor.point;

        return {
            longitude,
            latitude
        };
    }

    return (
        <>
            <Container>
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude,
                        longitude,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.02
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude,
                            longitude
                        }}
                        anchor={{ x: 0.5, y: 0.6 }}
                    >
                        <CarIcon source={require('../../assets/images/car.png')} />
                    </Marker>
                    {
                        realTime && getAnchorState() &&
                        <Circle
                            center={getAnchor()}
                            strokeWidth={2}
                            strokeColor={'#07C8F9'}
                            fillColor={'rgba(7, 200, 249, .2)'}
                            radius={20}
                        />
                    }
                </MapView>
                <PanGestureHandler onGestureEvent={gestureHandler}>
                    <CardContainer style={style}>
                        <Info style={iconStyle}>
                            <Icon name='up' color='black' size={22} />
                            <GoUpLabel>Ver detalhes</GoUpLabel>
                        </Info>
                        <Card ref={aRef}>
                            <Plate>{plate}</Plate>
                            <CardHeader>
                                <Model>{model} - {brand} {year}</Model>
                                <Row>
                                    <Ionicons name='calendar-outline' size={16} color='rgba(0, 0, 0, .6)' />
                                    <LastUpdate>{format(new Date(gps_date), "dd MMM yyyy 'as' HH:mm", { locale: ptBR })}</LastUpdate>
                                </Row>
                            </CardHeader>
                            <AddressRow>
                                <Address>{address ?? 'Sem informação'}</Address>
                            </AddressRow>
                        </Card>
                    </CardContainer>
                </PanGestureHandler>
            </Container>
            <StatusBar position='absolute' />
        </>
    );
}

export default Map;
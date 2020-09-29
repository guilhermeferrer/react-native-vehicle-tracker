import React, { useEffect } from 'react';
import Mapbox, { MapView, Camera } from '@react-native-mapbox-gl/maps';
import StatusBar from '../../components/StatusBar';
import { point } from '@turf/turf';
import { useDimensions } from '@react-native-community/hooks';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useSharedValue, useAnimatedStyle, useAnimatedGestureHandler, withSpring, repeat, withTiming, useAnimatedRef, withDecay, measure } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

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
    AddressRow
} from './styles';

import CardInfo from '../../components/CardInfo';

Mapbox.setAccessToken('pk.eyJ1IjoiZ3VpbGhlcm1lZm0iLCJhIjoiY2sxeTNnYjFmMGczMDNjbzNvYmdsdXVxcyJ9.HGlb6ErSRgQaGF8zAQZVew');

const Map = ({ route }) => {
    const { latitude, longitude } = route.params; route

    const { window: { height } } = useDimensions();
    const aRef = useAnimatedRef();

    const CLOSED = height - 50;
    const OPENED = height - 155;
    const translation = useSharedValue(CLOSED);
    const coordinate = [Number(longitude), Number(latitude)];
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
    }, []);

    return (
        <>
            <Container>
                <MapView
                    style={{ flex: 1 }}
                    /* styleURL={Mapbox.StyleURL.Dark} */
                    logoEnabled={false}
                    attributionEnabled={false}
                >
                    <Camera
                        centerCoordinate={coordinate}
                        zoomLevel={15}
                        animationDuration={0}
                    />
                    <Mapbox.Images images={{ carIcon: require('../../assets/images/car.png') }} />
                    <Mapbox.VectorSource>
                        <Mapbox.BackgroundLayer
                            id="background"
                            style={{ backgroundColor: '#0A85ED', backgroundOpacity: .1 }}
                        />
                        <Mapbox.FillLayer id="water" style={{ fillColor: '#0A8CB9' }} />
                    </Mapbox.VectorSource>
                    <Mapbox.ShapeSource
                        id="shapeSource"
                        aboveaboveLayerID='background'
                        shape={point(coordinate)}>
                        <Mapbox.SymbolLayer
                            id="shapePoint"
                            style={{
                                iconImage: 'carIcon',
                                iconAllowOverlap: true,
                                textAllowOverlap: true,
                                iconSize: .07
                            }}
                        />
                    </Mapbox.ShapeSource>
                </MapView>
                <PanGestureHandler onGestureEvent={gestureHandler}>
                    <CardContainer style={style}>
                        <Info style={iconStyle}>
                            <Icon name='up' color='black' size={22} />
                            <GoUpLabel>Ver detalhes</GoUpLabel>
                        </Info>
                        <Card ref={aRef}>
                            <Plate>URH-1293</Plate>
                            <CardHeader>
                                <Model>Chevrolet - Onix 2019</Model>
                                <Row>
                                    <Ionicons name='calendar-outline' size={16} color='rgba(0, 0, 0, .6)' />
                                    <LastUpdate>25 dez 2019 as 15:02</LastUpdate>
                                </Row>
                            </CardHeader>
                            <AddressRow>
                                <Address>Rua das mansões 240, Esplanada, Paracatu/MG</Address>
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
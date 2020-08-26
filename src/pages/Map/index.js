import React, { useEffect } from 'react';
import Mapbox, { MapView, Camera, BackgroundLayerProps } from '@react-native-mapbox-gl/maps';
import StatusBar from '../../components/StatusBar';
import { point } from '@turf/turf';
import { useDimensions } from '@react-native-community/hooks';

import { useSharedValue, useAnimatedStyle, useAnimatedGestureHandler, withSpring, repeat, delay, withTiming } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

import { Container, CardContainer, Info, Icon, Card, GoUpLabel } from './styles';

import CardInfo from '../../components/CardInfo';

Mapbox.setAccessToken('pk.eyJ1IjoiZ3VpbGhlcm1lZm0iLCJhIjoiY2sxeTNnYjFmMGczMDNjbzNvYmdsdXVxcyJ9.HGlb6ErSRgQaGF8zAQZVew');

const Map = () => {

    const { window: { height } } = useDimensions();

    const CLOSED = height - 50;
    const OPENED = height - 550;
    const translation = useSharedValue(CLOSED);
    const iconTranslation = useSharedValue(0);
    const coordinate = [-46.8778221, -17.2262663];
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
            if (translation.value >= CLOSED / 2) {
                translation.value = withSpring(OPENED, options);
            }
            else {
                translation.value = withSpring(CLOSED, options);
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
                    styleURL={Mapbox.StyleURL.Dark}
                    logoEnabled={false}
                    attributionEnabled={false}
                >
                    <Camera
                        centerCoordinate={coordinate}
                        zoomLevel={15}
                    />
                    <Mapbox.Images images={{ carIcon: require('../../assets/images/car.png') }} />
                    <Mapbox.VectorSource>
                        <Mapbox.BackgroundLayer
                            id="background"
                            style={{ backgroundColor: '#0A8CB9', backgroundOpacity: .3 }}
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
                            <Icon name='up' color='white' size={22} />
                            <GoUpLabel>Ver detalhes</GoUpLabel>
                        </Info>
                        <Card>
                        </Card>
                    </CardContainer>
                </PanGestureHandler>
            </Container>
            <StatusBar position='absolute' />
        </>
    );
}

export default Map;
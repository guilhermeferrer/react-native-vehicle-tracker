import React, { useEffect, useState } from 'react';
import Mapbox, { MapView, Camera } from '@react-native-mapbox-gl/maps';
import StatusBar from '../../components/StatusBar';
import { point, circle } from '@turf/turf';
import { useDimensions } from '@react-native-community/hooks';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/esm/locale';
import { useSelector } from 'react-redux';

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
    AddressRow
} from './styles';

import CardInfo from '../../components/CardInfo';

Mapbox.setAccessToken('pk.eyJ1IjoiZ3VpbGhlcm1lZm0iLCJhIjoiY2sxeTNnYjFmMGczMDNjbzNvYmdsdXVxcyJ9.HGlb6ErSRgQaGF8zAQZVew');

const Map = ({ route }) => {
    const client = io('http://nextfood.kinghost.net:21621');
    const { params } = route;
    const [position, setPosition] = useState(params);
    const [zoomLevel, setZoomLevel] = useState(0);
    const { plate, model, year, brand } = useSelector(state => state.vehicle.vehicle);

    const { latitude, longitude, imei, address, gps_date, realTime } = position;

    const { window: { height } } = useDimensions();
    const aRef = useAnimatedRef();

    const positionListener = () => client.on('position', position => {
        setPosition(position);
    });

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
        if (realTime) {
            positionListener();
            client.emit('join', imei);
        }
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
        return events_config.anchor.point;
    }

    return (
        <>
            <Container>
                <MapView
                    style={{ flex: 1 }}
                    /* styleURL={Mapbox.StyleURL.Dark} */
                    logoEnabled={false}
                    attributionEnabled={false}
                    onRegionDidChange={event => setZoomLevel(event.properties.zoomLevel)}
                >
                    <Camera
                        centerCoordinate={coordinate}
                        zoomLevel={15}
                    />
                    <Mapbox.Images images={{ carIcon: require('../../assets/images/car.png') }} />
                    <Mapbox.VectorSource>
                        <Mapbox.BackgroundLayer
                            id="background"
                            style={{ backgroundColor: '#0A85ED', backgroundOpacity: .1 }}
                        />
                        <Mapbox.FillLayer id="water" style={{ fillColor: '#0A8CB9' }} />
                    </Mapbox.VectorSource>
                    {
                        realTime && getAnchorState() && zoomLevel >= 15.6 &&
                        <>
                            <Mapbox.ShapeSource
                                id="line"
                                aboveLayerID='background'
                                shape={circle(getAnchor(), 50, { units: 'meters' })}>
                                <Mapbox.LineLayer
                                    id="shapeLine"
                                    style={{
                                        lineColor: '#0A85ED',
                                        lineWidth: 2.5,
                                        lineDasharray: [0.00001, 0.00001],
                                    }}
                                />
                            </Mapbox.ShapeSource>
                            <Mapbox.ShapeSource
                                id="circle"
                                bellowLayerID='iconShape'
                                shape={circle(getAnchor(), 50, { units: 'meters' })}>
                                <Mapbox.FillLayer
                                    id="shapeCircle"
                                    style={{ fillColor: '#0A85ED', fillOpacity: .2 }}
                                />
                            </Mapbox.ShapeSource>
                            <Mapbox.ShapeSource
                                id="iconShape2"
                                aboveLayerID='background'
                                shape={point(coordinate)}>
                                <Mapbox.SymbolLayer
                                    id="icon2"
                                    style={{
                                        iconImage: 'carIcon',
                                        iconAllowOverlap: true,
                                        textAllowOverlap: true,
                                        iconSize: .07
                                    }}
                                />
                            </Mapbox.ShapeSource>
                        </>
                    }
                    <Mapbox.ShapeSource
                        id="iconShape"
                        aboveLayerID='background'
                        shape={point(coordinate)}>
                        <Mapbox.SymbolLayer
                            id="icon"
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
import React, { useEffect, useState, useRef } from 'react';
import { Dimensions } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import StatusBar from '../../components/StatusBar';
import Loading from '../../components/Loading';
import { lineString, center } from '@turf/turf';
import { format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { getRoutes } from '../../store/modules/routes/action';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useSharedValue, useAnimatedGestureHandler, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const { height, width } = Dimensions.get('window');
import { snapPoint } from 'react-native-redash';

import {
    Container,
    Point,
    Card,
    Step,
    Carousel,
    PanView,
    Address,
    DateInfo,
    Row,
    Column,
    CircleLine,
    Line
} from './styles';

const card = width;

const Routes = () => {

    const dispatch = useDispatch();
    const imei = useSelector(state => state.vehicle.vehicle.imei);
    const routes = useSelector(state => state.routes.routes);
    const loading = useSelector(state => state.routes.loading);
    const [startPoint, setStartPoint] = useState();
    const [centerPoint, setCenterPoint] = useState();
    const [endPoint, setEndPoint] = useState();
    const [rootLine, setRootLine] = useState();
    const [index, setIndex] = useState(0);
    const mapRef = useRef();
    const x = useSharedValue(0);
    const measures = useSharedValue([]);

    const gestureHandler = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            ctx.startX = x.value;
        },
        onActive: (event, ctx) => {
            x.value = ctx.startX + event.translationX;
        },
        onEnd: (event) => {
            const snapTo = snapPoint(x.value, event.velocityX, measures.value);
            const index = measures.value.indexOf(snapTo);
            x.value = withTiming(snapTo);
            setIndex(index);
        }
    });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: x.value,
                },
            ]
        };
    });

    useEffect(() => {
        dispatch(getRoutes({ imei }));
    }, []);

    useEffect(() => {
        if (routes.length > 0)
            setInitialData();
    }, [routes, index]);

    useEffect(() => {
        measures.value = routes.map((_, index) => index * -width);
    }, [routes]);

    useEffect(() => {
        handleChangeCamera();
    }, [rootLine]);

    function handleChangeCamera() {
        if (!mapRef.current) return;

        const positions = coordinates();

        if (positions.length === 1)
            return mapRef.current.animateCamera({
                center: positions[0],
                pitch: 10,
                heading: 10,
                altitud: 10,
                zoom: 16
            }, { duration: 1000 });
        mapRef.current.fitToCoordinates(coordinates(), { animated: true });
    }

    function setInitialData() {
        const { positions, endDate } = routes[index];

        const lineRoutes = positions.map(({ latitude, longitude }) => [Number(longitude), Number(latitude)]);

        const centerPoint = endDate ? center(lineString(lineRoutes)) : lineRoutes[0];

        const position = endDate ? centerPoint.geometry.coordinates : centerPoint;

        setCenterPoint(arrayToObject(position));

        setStartPoint(lineRoutes[0]);
        setEndPoint(lineRoutes[lineRoutes.length - 1]);

        setRootLine(lineRoutes);
    }

    function arrayToObject(position) {
        const [longitude, latitude] = position;

        return {
            latitude,
            longitude
        };
    }

    function coordinates() {
        return rootLine.map(position => arrayToObject(position));
    }

    function handleIncrement() {
        setIndex(index + 1);
    }

    function handleDecrement() {
        setIndex(index - 1);
    }

    return (
        <>
            <Container>
                {loading || !centerPoint || !startPoint || !endPoint ? <Loading /> :
                    <>
                        <MapView
                            style={{ width: '100%', height: height + 300, marginTop: -250 }}
                            initialRegion={{
                                ...centerPoint,
                                latitudeDelta: 0.02,
                                longitudeDelta: 0.02
                            }}
                            ref={mapRef}
                            loadingEnabled={true}
                            onLayout={() => routes[index].endDate && mapRef.current.fitToCoordinates(coordinates(), { animated: false })}
                        >
                            {rootLine &&
                                <Polyline
                                    coordinates={coordinates()}
                                    strokeColor="#07C8F9"
                                    strokeWidth={3}
                                />}
                            {
                                startPoint &&
                                <Marker coordinate={arrayToObject(startPoint)}>
                                    <Point />
                                </Marker>}
                            {
                                endPoint &&
                                <Marker coordinate={arrayToObject(endPoint)}>
                                    <Point />
                                </Marker>
                            }
                        </MapView>
                        <PanGestureHandler onGestureEvent={gestureHandler}>
                            <PanView>
                                <Carousel width={card * routes.length} style={animatedStyle}>
                                    {
                                        routes.map(({ startDate, startAddress, endDate, endAddress }, index) => (
                                            <Card width={card - 30} key={index}>
                                                <Step>Trecho {index + 1} de {routes.length}</Step>
                                                <Row>
                                                    {endDate
                                                        ?
                                                        <CircleLine>
                                                            <Point />
                                                            <Line />
                                                        </CircleLine>
                                                        :
                                                        <Point />
                                                    }
                                                    <Column expand={endDate}>
                                                        <Address>{startAddress}</Address>
                                                        <DateInfo>{format(new Date(startDate), 'dd/MM/yyyy HH:mm')}</DateInfo>
                                                    </Column>
                                                </Row>
                                                {
                                                    endDate &&
                                                    <Row>
                                                        <Point />
                                                        <Column>
                                                            <Address>{endAddress}</Address>
                                                            <DateInfo>{format(new Date(endDate), 'dd/MM/yyyy HH:mm')}</DateInfo>
                                                        </Column>
                                                    </Row>
                                                }
                                            </Card>
                                        ))
                                    }
                                </Carousel>
                            </PanView>
                        </PanGestureHandler>
                    </>
                }
            </Container>
            <StatusBar position='absolute' />
        </>
    );
}

export default Routes;
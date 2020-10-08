import React, { useEffect } from 'react';
import Mapbox, { MapView, Camera } from '@react-native-mapbox-gl/maps';
import StatusBar from '../../components/StatusBar';
import Loading from '../../components/Loading';
import { point, circle } from '@turf/turf';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { lineString } from '@turf/turf';

import { getRoutes } from '../../store/modules/routes/action';

import {
    Container,
    Point
} from './styles';

Mapbox.setAccessToken('pk.eyJ1IjoiZ3VpbGhlcm1lZm0iLCJhIjoiY2sxeTNnYjFmMGczMDNjbzNvYmdsdXVxcyJ9.HGlb6ErSRgQaGF8zAQZVew');

const Routes = () => {

    const dispatch = useDispatch();
    const imei = useSelector(state => state.vehicle.vehicle.imei);
    const routes = useSelector(state => state.routes.routes);
    const loading = useSelector(state => state.routes.loading);

    useEffect(() => {
        dispatch(getRoutes({ imei }));
    }, []);

    function renderPoint(coordinate, id) {
        return (
            <Mapbox.PointAnnotation
                coordinate={coordinate}
                aboveLayerID='shapeLine'
                id={id}
            >
                <Point />
            </Mapbox.PointAnnotation>
        )
    }

    return (
        <>
            <Container>
                {loading ? <Loading /> :
                    <MapView
                        style={{ flex: 1 }}
                        /* styleURL={Mapbox.StyleURL.Dark} */
                        logoEnabled={false}
                        attributionEnabled={false}
                    >
                        <Camera
                            centerCoordinate={routes[1].positions.map(({ latitude, longitude }) => [Number(longitude), Number(latitude)])[0]}
                            zoomLevel={16}
                        />
                        <Mapbox.Images images={{ carIcon: require('../../assets/images/car.png') }} />
                        {renderPoint(routes[1].positions.map(({ latitude, longitude }) => [Number(longitude), Number(latitude)])[0], 'start')}
                        {renderPoint(routes[1].positions.map(({ latitude, longitude }) => [Number(longitude), Number(latitude)])[routes[1].positions.length - 1], 'end')}
                        <Mapbox.ShapeSource
                            id="line"
                            aboveLayerID='background'
                            bellowLayerID='start'
                            shape={lineString(routes[1].positions.map(({ latitude, longitude }) => [Number(longitude), Number(latitude)]))}>
                            <Mapbox.LineLayer
                                id="shapeLine"
                                style={{
                                    lineColor: '#0A85ED',
                                    lineWidth: 4,
                                    lineOpacity: .3
                                }}
                            />
                        </Mapbox.ShapeSource>
                        <Mapbox.VectorSource>
                            <Mapbox.BackgroundLayer
                                id="background"
                                style={{ backgroundColor: '#0A85ED', backgroundOpacity: .1 }}
                            />
                            <Mapbox.FillLayer id="water" style={{ fillColor: '#0A8CB9' }} />
                        </Mapbox.VectorSource>
                    </MapView>
                }
            </Container>
            <StatusBar position='absolute' />
        </>
    );
}

export default Routes;
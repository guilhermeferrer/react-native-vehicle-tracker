import React from 'react';

import { Container, Backdrop, Card } from './styles';
import Mapbox, { MapView, Camera } from '@react-native-mapbox-gl/maps';
import StatusBar from '../../components/StatusBar';
import { point } from '@turf/turf';

import CardInfo from '../../components/CardInfo';

Mapbox.setAccessToken('pk.eyJ1IjoiZ3VpbGhlcm1lZm0iLCJhIjoiY2sxeTNnYjFmMGczMDNjbzNvYmdsdXVxcyJ9.HGlb6ErSRgQaGF8zAQZVew');

const Map = () => {

    const coordinate = [-46.8778221, -17.2262663];

    return (
        <>
            <Container>
                <MapView style={{ flex: 1 }} styleURL={Mapbox.StyleURL.Dark}>
                    <Camera
                        centerCoordinate={coordinate}
                        zoomLevel={15}
                    />
                    <Mapbox.Images images={{ carIcon: require('../../assets/images/car.png') }} />
                    <Mapbox.ShapeSource
                        id="shapeSource"
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
                <Backdrop pointerEvents='none' />
                <Card>
                    <CardInfo />
                </Card>
            </Container>
            <StatusBar />
        </>
    );
}

export default Map;
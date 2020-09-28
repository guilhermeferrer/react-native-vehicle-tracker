import React from 'react';

import { Container, Row, Column, Model, Plate, Brand, Image } from './styles';

import { useNavigation } from '@react-navigation/native';

const Vehicle = ({ plate, model, year, brand, icon }) => {
    const { navigate } = useNavigation();
    const offset = 20;

    return (
        <Container onPress={() => navigate('Positions')}>
            <Row>
                <Column>
                    <Plate>{plate}</Plate>
                    <Model>{model} - {year}</Model>
                    <Brand>{brand}</Brand>
                </Column>
                <Image source={{ uri: icon }} />
            </Row>
        </Container>
    );
}

export default Vehicle;
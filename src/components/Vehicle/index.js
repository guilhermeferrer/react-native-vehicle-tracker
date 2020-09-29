import React from 'react';

import { Container, Row, Column, Model, Plate, Brand, Image } from './styles';
import { alert } from '../../services/alert';

import { useNavigation } from '@react-navigation/native';

const Vehicle = ({ equipment, plate, model, year, brand, icon }) => {
    const { navigate } = useNavigation();
    const offset = 20;

    function handlePress() {
        if (!equipment)
            return alert('warn', 'Aviso', 'Nenhum rastreador vinculado no veículo!');
        navigate('Positions', { imei: equipment.imei });
    }

    return (
        <Container onPress={handlePress}>
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
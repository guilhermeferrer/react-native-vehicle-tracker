import React, { useEffect } from 'react';

import { Container, Row, Column, Model, Plate, Brand, Image } from './styles';
import { alert } from '../../services/alert';

import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setVehicle } from '../../store/modules/vehicle/action';
import OneSignal from 'react-native-onesignal';

const Vehicle = ({ equipment, plate, model, year, brand, icon }) => {
    const { navigate } = useNavigation();
    const offset = 20;
    const dispatch = useDispatch();

    function handlePress() {
        if (!equipment)
            return alert('warn', 'Aviso', 'Nenhum rastreador vinculado no veículo!');
        dispatch(setVehicle({ plate, model, year, brand, icon, imei: equipment.imei }));
        navigate('Positions', { imei: equipment.imei });
    }

    useEffect(() => {
        if (equipment)
            OneSignal.sendTag(equipment.imei, true);
    }, []);

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
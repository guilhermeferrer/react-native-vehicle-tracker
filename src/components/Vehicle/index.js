import React from 'react';

import { Container, LastUpdate, Date, Info, Text, Line, SmallLine, Column, Circle, Name, Plate } from './styles';

import { useNavigation } from '@react-navigation/native';

const Vehicle = () => {
    const { navigate } = useNavigation();
    const offset = 20;

    return (
        <Container onPress={() => navigate('Map')}>
            <LastUpdate offset={offset}>
                <Date>25/08 15:13</Date>
            </LastUpdate>
            <Column>
                <SmallLine offset={offset} />
                <Circle />
                <Line />
            </Column>
            <Info offset={offset}>
                <Plate>Ignição ligada</Plate>
                <Text>Rua das mansões, 240, Esplanada, Paracatu/MG Brasil</Text>
                <Name>-17.225995,-46.880330</Name>
            </Info>
        </Container>
    );
}

export default Vehicle;
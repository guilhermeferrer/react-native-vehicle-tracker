import React from 'react';
import { format } from 'date-fns';

import { Container, LastUpdate, Period, Info, Address, Line, SmallLine, Column, Circle, SmallText, Text } from './styles';

import { useNavigation } from '@react-navigation/native';

const Position = ({ position }) => {
    const { createdAt, ignition, latitude, longitude } = position;
    const { navigate } = useNavigation();
    const offset = 20;

    return (
        <Container onPress={() => navigate('Map', { latitude, longitude })}>
            <LastUpdate offset={offset}>
                <Period>{format(new Date(createdAt), 'dd/MM HH:mm')}</Period>
            </LastUpdate>
            <Column>
                <SmallLine offset={offset} />
                <Circle />
                <Line />
            </Column>
            <Info offset={offset}>
                <Text>Ignição {ignition ? 'ligada' : 'desligada'}</Text>
                <Address>Rua das mansões, 240, Esplanada, Paracatu/MG Brasil</Address>
                <SmallText>{Number(latitude).toFixed(6)}, {Number(longitude).toFixed(6)}</SmallText>
            </Info>
        </Container>
    );
}

export default Position;
import React from 'react';
import { format } from 'date-fns';

import { Container, LastUpdate, Period, Info, Address, Line, SmallLine, Column, Circle, SmallText, Text } from './styles';

import { useNavigation } from '@react-navigation/native';

const Position = ({ position }) => {
    const { gps_date, ignition, latitude, longitude, address } = position;
    const { navigate } = useNavigation();
    const offset = 20;

    return (
        <Container onPress={() => navigate('Map', position)}>
            <LastUpdate offset={offset}>
                <Period>{format(new Date(gps_date), 'dd/MM HH:mm')}</Period>
            </LastUpdate>
            <Column>
                <SmallLine offset={offset} />
                <Circle />
                <Line />
            </Column>
            <Info offset={offset}>
                <Text>Ignição {ignition ? 'ligada' : 'desligada'}</Text>
                <Address>{address ?? 'Sem informação'}</Address>
                <SmallText>{Number(latitude).toFixed(6)}, {Number(longitude).toFixed(6)}</SmallText>
            </Info>
        </Container>
    );
}

export default Position;
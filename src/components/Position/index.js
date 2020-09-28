import React from 'react';

import { Container, LastUpdate, Date, Info, Address, Line, SmallLine, Column, Circle, SmallText, Text } from './styles';

import { useNavigation } from '@react-navigation/native';

const Position = () => {
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
                <Text>Ignição ligada</Text>
                <Address>Rua das mansões, 240, Esplanada, Paracatu/MG Brasil</Address>
                <SmallText>-17.225995,-46.880330</SmallText>
            </Info>
        </Container>
    );
}

export default Position;
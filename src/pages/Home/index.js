import React from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';

import { Container, Card, Row, Column, Number, Text, SmallText, Title, Header } from './styles';
//import { StatusBar, Text } from 'react-native';

import StatusBar from '../../components/StatusBar';

export default function Home() {

    return (
        <>
            <StatusBar backgroundColor={'#0A8CB9'} />
            <Container>
                <Header>
                    <IonIcon name='menu' color='white' size={25} />
                    <Title>DASHBOARD</Title>
                    <IonIcon name='person-circle' color='white' size={25} />
                </Header>
                <Card>
                    <Row>
                        <Number>03</Number>
                        <Column>
                            <Text>VEÍCULOS ATIVOS</Text>
                            <SmallText>Last updated 07/02/2020 03:58</SmallText>
                        </Column>
                    </Row>
                </Card>
            </Container>
        </>
    );
}
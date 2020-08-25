import React from 'react';

import { Container, Header, BackButton, Title, Offset } from './styles';

import Icon from 'react-native-vector-icons/AntDesign';

const Report = ({ navigation, route }) => {
    const { name } = route.params;
    return (
        <Container>
            <Header>
                <BackButton onPress={() => navigation.goBack()}>
                    <Icon name='close' size={22} color='rgba(0, 0, 0, .6)' />
                </BackButton>
                <Title>Relatório de {name}</Title>
                <Offset />
            </Header>
        </Container>
    )
}

export default Report;
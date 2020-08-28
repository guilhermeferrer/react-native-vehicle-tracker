import React from 'react';

import { Container, Image, Content, Line, Title, SubTitle, Input, Button, ButtonText } from './styles';
import StatusBar from '../../components/StatusBar';

const Login = ({ navigation }) => {
    return (
        <>
            <StatusBar position='absolute' />
            <Image source={require('../../assets/images/background.jpg')} />
            <Container>
                <Content>
                    <SubTitle>DIGITE SEUS DADOS</SubTitle>
                    <Line />
                    <Title>Entrar</Title>
                    <Input placeholder='Usuário' />
                    <Input placeholder='Senha' />
                    <Button onPress={() => navigation.navigate('Home')}>
                        <ButtonText>Entrar</ButtonText>
                    </Button>
                </Content>
            </Container>
        </>
    );
}

export default Login;
import React from 'react';
import { alert } from '../../services/alert';

import { Container, Image, Content, Line, Title, SubTitle, Input, Button, ButtonText, Header, HeaderContent } from './styles';
import StatusBar from '../../components/StatusBar';

const Login = ({ navigation }) => {

    function handleErrors() {
        //alert('error', 'Error', 'Errors');
        navigation.navigate('Home');
    }

    return (
        <>
            <StatusBar position='absolute' />
            <Container>
                <Header>
                    <HeaderContent>

                    </HeaderContent>
                </Header>
                <Content>
                    <Title>Entrar</Title>
                    <Input placeholder='Usuário' />
                    <Input placeholder='Senha' />
                    <Button onPress={handleErrors}>
                        <ButtonText>ENTRAR</ButtonText>
                    </Button>
                </Content>
            </Container>
        </>
    );
}

export default Login;
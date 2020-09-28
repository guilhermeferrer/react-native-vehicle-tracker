import React, { useState } from 'react';

import { Container, Content, Title, Input, Button, ButtonText, Header, HeaderContent } from './styles';
import StatusBar from '../../components/StatusBar';

import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/modules/user/action';
import Spinkit from 'react-native-spinkit';

const Login = ({ navigation }) => {

    const [user, setUser] = useState();
    const [password, setPassword] = useState();
    const loading = useSelector(state => state.user.loading);
    const dispatch = useDispatch();

    function handleLogin() {
        dispatch(login(user, password));
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
                    <Title>LOGIN</Title>
                    <Input
                        placeholder='Usuário'
                        onChangeText={setUser}
                        autoCapitalize='none'
                    />
                    <Input
                        placeholder='Senha'
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />
                    <Button onPress={handleLogin}>
                        {
                            loading
                                ?
                                <Spinkit color='white' size={22} type='ThreeBounce' />
                                :
                                <ButtonText>ENTRAR</ButtonText>

                        }
                    </Button>
                </Content>
            </Container>
        </>
    );
}

export default Login;
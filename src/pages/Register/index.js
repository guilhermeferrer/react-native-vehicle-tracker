import React, { useState } from 'react';

import { Container, Content, Title, Input, Button, ButtonText, Header, HeaderContent, Banner } from './styles';
import StatusBar from '../../components/StatusBar';

import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../store/modules/user/action';
import Spinkit from 'react-native-spinkit';

const Register = () => {

    const loading = useSelector(state => state.user.loadingRegister);
    const dispatch = useDispatch();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();

    function handleRegister() {
        dispatch(register({ name, email, password }));
    }

    return (
        <>
            <StatusBar position='absolute' />
            <Container>
                <Header>
                    <HeaderContent>
                        <Banner source={require('../../assets/images/banner.png')} />
                    </HeaderContent>
                </Header>
                <Content>
                    <Title>CADASTRO</Title>
                    <Input
                        placeholder='Nome'
                        onChangeText={setName}
                        autoCapitalize='none'
                        value={name}
                    />
                    <Input
                        placeholder='Email'
                        onChangeText={setEmail}
                        autoCapitalize='none'
                        value={email}
                    />
                    <Input
                        placeholder='Senha'
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        value={password}
                    />
                    <Button onPress={handleRegister}>
                        {
                            loading
                                ?
                                <Spinkit color='white' size={22} type='ThreeBounce' />
                                :
                                <ButtonText>CRIAR CONTA</ButtonText>

                        }
                    </Button>
                </Content>
            </Container>
        </>
    );
}

export default Register;
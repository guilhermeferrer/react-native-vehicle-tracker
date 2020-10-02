import React, { useState } from 'react';

import { Container, Content, Title, Input, Button, ButtonText, Header, HeaderContent, Banner, RememberMeButton, RememberMeCheckBox, RememberMeLabel, RegisterSection, RegisterButton, RegisterLabel } from './styles';
import StatusBar from '../../components/StatusBar';
import { TouchableWithoutFeedback } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { login, toggleRememberMe } from '../../store/modules/user/action';
import Spinkit from 'react-native-spinkit';
import Icon from 'react-native-vector-icons/Ionicons';

const Login = ({ navigation }) => {

    const storagedEmail = useSelector(state => state.user.email);
    const storagedPassword = useSelector(state => state.user.password);
    const loading = useSelector(state => state.user.loading);
    const rememberMe = useSelector(state => state.user.rememberMe);
    const dispatch = useDispatch();

    const [email, setEmail] = useState(storagedEmail);
    const [password, setPassword] = useState(storagedPassword);

    function handleLogin() {
        dispatch(login(email, password));
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
                    <Title>LOGIN</Title>
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
                    <TouchableWithoutFeedback onPress={() => dispatch(toggleRememberMe())}>
                        <RememberMeButton>
                            <RememberMeCheckBox rememberMe={rememberMe}>
                                <Icon name='checkmark-outline' color={rememberMe ? 'white' : '#f2f5f7'} />
                            </RememberMeCheckBox>
                            <RememberMeLabel>Lembrar dados</RememberMeLabel>
                        </RememberMeButton>
                    </TouchableWithoutFeedback>
                    <Button onPress={handleLogin}>
                        {
                            loading
                                ?
                                <Spinkit color='white' size={22} type='ThreeBounce' />
                                :
                                <ButtonText>ENTRAR</ButtonText>

                        }
                    </Button>
                    <RegisterSection>
                        <RegisterButton onPress={() => navigation.navigate('Register')}>
                            <RegisterLabel>Criar conta</RegisterLabel>
                        </RegisterButton>
                    </RegisterSection>
                </Content>
            </Container>
        </>
    );
}

export default Login;
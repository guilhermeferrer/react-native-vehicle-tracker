import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(LinearGradient).attrs({
    colors: ['rgba(0, 0, 0, .6)', 'rgba(0, 0, 0, .8)']
})`
    flex: 1;
    justify-content: center;
    padding: 7%;
`;

export const Image = styled.Image`
    width: 100%;
    height: 100%;
    resize-mode: cover;
    position: absolute;
`;

export const Content = styled.View`
    padding: 15px;
    background-color: white;
`;

export const Title = styled.Text`
    color: black;
    font-size: 35px;
    font-weight: bold;
    letter-spacing: 2px;
    margin-bottom: 15px;
`;

export const SubTitle = styled.Text`
    color: black;
`;

export const Line = styled.Text`
    background-color: #f2f5f7;
    width: 100%;
    height: 4px;
    margin-top: 5px;
    margin-bottom: 10px;
    border-left-width: 140px;
    border-color: #011536;
`;

export const Input = styled.TextInput`
    background-color: #f2f5f7;
    padding: 0 10px;
    border-radius: 4px;
    height: 50px;
    margin-top: 5px;
`;

export const Button = styled(RectButton)`
    height: 50px;
    background-color: #011536;
    border-radius: 2px;
    margin-top: 15px;

    justify-content: center;
    align-items: center;
`;

export const ButtonText = styled.Text`
    color: white;
    font-weight: bold;
    letter-spacing: 1px;
`;
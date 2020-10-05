import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
    flex: 1;
    justify-content: flex-end;
    background: #0A85ED;
`;

export const Header = styled.View`
    flex: 1;
    background: white;
`;

export const HeaderContent = styled(LinearGradient).attrs({
    colors: ['#07C8F9', '#09A6F3', '#0A85ED']
})`
    flex: 1;
    border-bottom-left-radius: 90px;
    justify-content: center;
    align-items: center;
`;

export const Banner = styled.Image`
    height: 280px;
    width: 280px;
    resize-mode: contain;
`;

export const Content = styled.View`
    padding: 25px;
    background-color: white;
    border-top-right-radius: 90px;
`;

export const Title = styled.Text`
    color: black;
    font-size: 35px;
    letter-spacing: 2px;
    margin-bottom: 15px;
    font-family: 'Montserrat-Bold';
`;

export const Input = styled.TextInput`
    background-color: #f2f5f7;
    padding: 0 10px;
    border-radius: 4px;
    height: 50px;
    margin-bottom: 10px;
    font-family: 'Montserrat-Regular';
`;

export const Button = styled(RectButton)`
    height: 50px;
    background-color: #0A85ED;
    border-radius: 2px;
    margin-top: 10px;

    justify-content: center;
    align-items: center;
    border-radius: 3px;
`;

export const ButtonText = styled.Text`
    color: white;
    letter-spacing: 1px;
    font-family: 'Montserrat-Bold';
`;
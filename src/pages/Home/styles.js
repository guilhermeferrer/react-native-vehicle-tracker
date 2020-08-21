import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(LinearGradient).attrs({
    colors: ['#0A8CB9', '#058086', '#02796A']
})`
    flex: 1;
    padding: 0 15px;
    align-items: center;
`;

export const Title = styled.Text`
    color: white;
    font-weight: bold;
`;

export const Card = styled(RectButton)`
    border-radius: 6px;
    padding: 15px;
    background: rgba(0, 0, 0, .15);
    width: 100%;
`;

export const Row = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Header = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 15px 0;
    margin-bottom: 10px;
`;

export const Column = styled.View`
`;

export const Number = styled.Text`
    font-weight: bold;
    font-size: 50px;
    color: white;
    margin-right: 15px;
`;

export const Text = styled.Text`
    color: white;
`;

export const SmallText = styled.Text`
    color: rgba(255, 255, 255, 0.6);
    font-size: 12px;
`;
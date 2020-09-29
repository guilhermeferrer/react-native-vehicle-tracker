import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
    flex-direction: row;
    background: rgba(0, 0, 0, .15);
`;

export const LastUpdate = styled.View`
    width: 30%;
    padding-top: ${props => props.offset}px;
    align-items: center;
`;

export const Column = styled.View`
    justify-content: center;
    align-items: center;
`;

export const SmallLine = styled.View`
    width: 1px;
    background: rgba(255, 255, 255, .3);
    height: ${props => props.offset}px;
`;

export const Line = styled.View`
    width: 1px;
    background: rgba(255, 255, 255, .3);
    flex: 1;
`;

export const Circle = styled.View`
    height: 20px;
    width: 20px;
    border-radius: 10px;
    background: white;
`;

export const Period = styled.Text`
    color: white;
    font-family: 'Montserrat-Regular';
`;

export const Info = styled.View`
    flex: 1;
    padding: ${props => props.offset}px 10px;
`;

export const Text = styled.Text`
    color: white;
    font-family: 'Montserrat-Regular';
`;

export const Address = styled.Text`
    color: white;
    font-family: 'RussoOne-Regular';
    margin: 7px 0;
`;

export const SmallText = styled.Text`
    color: rgba(255, 255, 255, .8);
    font-size: 12px;
    font-family: 'RussoOne-Light';
`;
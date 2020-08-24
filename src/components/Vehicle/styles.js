import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
    flex-direction: row;
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

export const Date = styled.Text`
    color: white;
`;

export const Info = styled.View`
    flex: 1;
    padding: ${props => props.offset}px 10px;
`;

export const Plate = styled.Text`
    color: white;
`;

export const Text = styled.Text`
    color: white;
    font-family: 'RussoOne-Regular';
`;

export const Name = styled.Text`
    color: rgba(255, 255, 255, .6);
    font-size: 12px;
`;
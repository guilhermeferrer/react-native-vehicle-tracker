import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
    flex-direction: row;
    background: rgba(0, 0, 0, .15);
    margin-bottom: 10px;
    border-radius: 4px;
    padding: 15px;
`;

export const Row = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
`;

export const Column = styled.View`
    
`;

export const Model = styled.Text`
    font-size: 22px;
    color: white;
    font-family: 'Montserrat-SemiBold';
`;

export const Plate = styled.Text`
    color: white;   
    font-family: 'Montserrat-Regular';
`;

export const Brand = styled.Text`
    color: white;
    font-family: 'Montserrat-Light';
`;

export const Image = styled.Image`
    width: 100px;
    resize-mode: contain;
`;
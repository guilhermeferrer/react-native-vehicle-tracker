import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const Container = styled.View`
    flex: 1;
    background-color: white;
    margin-top: ${getStatusBarHeight()}px;
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    border-bottom-width: ${StyleSheet.hairlineWidth}px;
    border-color: rgba(0, 0, 0, .3);
`;

export const BackButton = styled(BorderlessButton)`
    justify-content: center;
    align-items: center;
    padding: 10px;
`;

export const Title = styled.Text`
    font-size: 18px;
`;

export const Offset = styled.View`
    width: 18px;
`;

export const Content = styled.View`
    padding: 15px;
`;

export const ContentTitle = styled.Text`
    font-size: 18px;
    font-family: 'Montserrat-Bold';
`;

export const DateButton = styled(RectButton)`
    flex-direction: row;
    padding: 15px 5px;
    justify-content: space-between;
`;

export const OptionInfo = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const Icon = styled.Image`
    width: 20px;
    height: 20px;
    resize-mode: contain;
    margin-right: 5px;
`;

export const Label = styled.Text`

`;

export const Line = styled.View`
    height: ${StyleSheet.hairlineWidth}px;
    background: rgba(0, 0, 0, .3);
    width: 100%;
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

export const Footer = styled.View`
    flex: 1;
    justify-content: flex-end;
    padding: 15px;
`;
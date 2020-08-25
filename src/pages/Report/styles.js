import styled from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';

export const Container = styled.View`
    flex: 1;
    background-color: white;
    margin-top: 70px;
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
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
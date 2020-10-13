import styled from 'styled-components/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Animated from 'react-native-reanimated';

export const Container = styled.View`
    flex: 1;
`;

export const CardContainer = styled(Animated.View)`
    position: absolute;
    width: 95%;
    margin-left: 2.5%;
    border-radius: 4px;
    z-index: 200;
    justify-content: center;
    align-items: center;
`;

export const Info = styled(Animated.View)`
    height: 50px;
    align-items: center;
`;

export const Icon = styled(Animated.createAnimatedComponent(AntDesign))``;

export const GoUpLabel = styled(Animated.Text)`
    color: black;
    font-family: 'Montserrat-Medium';
`;

export const Card = styled.View`
    width: 100%;
    padding: 15px;
    background-color: white;
    border-radius: 4px;
    margin-top: 15px;
`;

export const Plate = styled.Text`
    font-size: 18px;
    font-family: 'Montserrat-Medium';
`;

export const Row = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const CardHeader = styled(Row)`
    border-bottom-width: 1px;
    padding-bottom: 10px;
    border-color: rgba(0, 0, 0, .2);
`;

export const AddressRow = styled(Row)`
    padding: 10px 0;
    max-width: 90%;
`;

export const Model = styled.Text`
    font-size: 12px;
    margin-right: 15px;
    font-family: 'Montserrat-Light';
`;

export const LastUpdate = styled.Text`
    font-size: 12px;
    margin-left: 5px;
    font-family: 'Montserrat-Light';
`;

export const Address = styled.Text`
    font-size: 14px;
    font-family: 'Montserrat-Regular';
`;

export const CarIcon = styled.Image`
    resize-mode: contain;
    width: 50px;
    margin-top: 15px;
    height: 50px;
`;
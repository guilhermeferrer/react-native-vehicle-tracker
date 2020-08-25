import styled from 'styled-components/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Animated from 'react-native-reanimated';

export const Container = styled.View`
    flex: 1;
`;

export const Backdrop = styled.View`
    background: #0A8CB9;
    opacity: .2;
    z-index: 100;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
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
    color: white;
`;

export const Card = styled.View`
    width: 100%;
    padding: 15px;
    height: 550px;
    background-color: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    margin-top: 15px;
`;
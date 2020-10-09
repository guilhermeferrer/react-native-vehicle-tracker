import styled from 'styled-components/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Animated from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(LinearGradient).attrs({
    colors: ['#07C8F9', '#09A6F3', '#0A85ED']
})`
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

export const Card = styled(Animated.View)`
    width: ${props => props.width}px;
    height: 150px;
    elevation: .5;
    margin-left: 15px;
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

export const Point = styled.View`
    background-color: white;
    border-width: 5px;
    width: 25px;
    height: 25px;
    border-radius: 12px;
    border-color: #09A6F3; 
    elevation: 2;
`;

export const Next = styled(RectButton)`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    elevation: 1;
    background: #0A85ED;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 10px;
    top: 30%;
`;

export const Back = styled(RectButton)`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    elevation: 1;
    background: #0A85ED;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 10px;
    top: 30%;
`;

export const Carousel = styled(Animated.View)`
    width: ${props => props.width}px;
    flex-direction: row;
    background: red;
    position: absolute;
    bottom: 10px;
`;

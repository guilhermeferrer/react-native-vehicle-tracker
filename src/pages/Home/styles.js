import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Button = Animated.createAnimatedComponent(RectButton);

const { height } = Dimensions.get('window');

export const Container = styled(LinearGradient).attrs({
    colors: ['#0A8CB9', '#058086', '#02796A']
})`
    flex: 1;
`;

export const Title = styled.Text`
    color: white;
    font-size: 18px;
    margin-bottom: 5px;
    font-family: 'RussoOne-Regular';
`;

export const Card = styled(Button)`
    border-radius: 6px;
    padding: 15px;
    background: rgba(0, 0, 0, .15);
    width: 100%;
`;

export const Content = styled.View`
    flex: 1;
    padding: 0 15px;
    align-items: center;
`;

export const Row = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
`;

export const Hidden = styled(Animated.ScrollView).attrs(props => ({
    ...props,
    showsVerticalScrollIndicator: false
}))`
    position: absolute;
    width: 100%;
    height: ${height - 170}px;
`;

export const Scroll = styled(Animated.ScrollView)`
    margin-top: 10px;
    background: rgba(0, 0, 0, .15);
    width: 100%;
    border-radius: 6px;
    margin-bottom: 15px;
`;

export const Header = styled.View`
    align-items: center;
    justify-content: center;
    margin: 10px 0;
`;

export const Column = styled.View`
`;

export const LastPosition = styled.Text`
    color: white;
    font-size: 18px;
`;

export const Address = styled.Text`
    color: white;
    font-size: 12px;
    flex: 1;
`;

export const SmallText = styled.Text`
    color: rgba(255, 255, 255, 0.6);
    font-size: 12px;
`;

export const Icon = styled(Animated.createAnimatedComponent(AntDesign))``;

export const OptionsContainer = styled.View`
    margin: 20px 10px 10px 10px;
    border-top-width: 1px;
    border-color: rgba(255, 255, 255, .4);
`;

export const OptionRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 15px 0;
    border-bottom-width: 1px;
    border-color: rgba(255, 255, 255, .4);
    align-items: center;
`;

export const IconRow = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const OptionLabel = styled.Text`
    color: white;
    font-size: 16px;
    margin-left: 10px;
`;
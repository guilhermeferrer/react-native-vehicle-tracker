import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Button = Animated.createAnimatedComponent(RectButton);

const { height } = Dimensions.get('window');

export const Container = styled(LinearGradient).attrs({
    colors: ['#07C8F9', '#09A6F3', '#0A85ED']
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
    width: 100%;
    padding: 15px;
    background: rgba(0, 0, 0, .15);
    border-radius: 6px;
`;

export const Content = styled.View`
    flex: 1;
    align-items: center;
`;

export const Row = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Hidden = styled(Animated.ScrollView).attrs(props => ({
    ...props,
    showsVerticalScrollIndicator: false
}))`
    position: absolute;
    width: 100%;
    height: ${height - 170}px;
    padding: 0 15px;
`;

export const Scroll = styled(Animated.ScrollView)`
    margin-top: 10px;
    width: 100%;
    border-radius: 6px;
    margin-bottom: 15px;
    padding: 0 15px;
`;

export const Header = styled.View`
    align-items: center;
    justify-content: center;
    margin: 10px 0;
`;

export const Column = styled.View`
    width: 100%;
    padding: 0 15px;
`;

export const LastPosition = styled.Text`
    color: white;
    font-size: 18px;
    font-family: 'Montserrat-Bold';
`;

export const Address = styled.Text`
    color: white;
    font-size: 12px;
    margin-top: 5px;
    flex: 1;
    font-family: 'Montserrat-Regular';
`;

export const SmallText = styled.Text`
    color: rgba(255, 255, 255, .8);
    font-size: 12px;
    font-family: 'Montserrat-Light';
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
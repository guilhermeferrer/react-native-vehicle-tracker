import React, { useEffect } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useBackHandler } from '@react-native-community/hooks';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RectButton } from 'react-native-gesture-handler';
import { format } from 'date-fns';

import {
    Container,
    Scroll,
    Card,
    Column,
    SmallText,
    Title,
    Header,
    Icon,
    Content,
    Hidden,
    LastPosition,
    Address,
    Row,
    OptionsContainer,
    IconRow,
    OptionRow,
    OptionLabel
} from './styles';

import StatusBar from '../../components/StatusBar';
import Position from '../../components/Position';
import CardInfo from '../../components/CardInfo';
import Loading from '../../components/Loading';

import { useDispatch, useSelector } from 'react-redux';
import { getLastPosition, getPositions } from '../../store/modules/position/action';

import { useSharedValue, useAnimatedStyle, withTiming, useDerivedValue, useAnimatedRef, runOnUI, measure, scrollTo } from 'react-native-reanimated';
import { last } from 'rxjs/operators';

export default function Positions({ navigation, route }) {

    const opened = useSharedValue(false);
    const translation = useSharedValue(0);
    const aRef = useAnimatedRef();
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const imei = route.params.imei;

    const lastPosition = useSelector(state => state.position.lastPosition);
    const positions = useSelector(state => state.position.positions);
    const loading = useSelector(state => state.position.loading);
    console.log(positions);

    const config = {
        duration: 200
    }

    const iconRotation = useDerivedValue(() => {
        return withTiming(opened.value ? -Math.PI : 0);
    });

    const style = useAnimatedStyle(() => {
        return {
            translateY: withTiming(translation.value, config),
        }
    });

    const buttonStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(opened.value ? 0 : 1, config)
        }
    });

    const hiddenViewStyle = useAnimatedStyle(() => {
        return {
            zIndex: opened.value ? 1 : withTiming(-5, config),
            opacity: withTiming(opened.value ? 1 : 0, config)
        }
    });

    const iconStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotate: `${iconRotation.value}rad`
                }
            ]
        }
    });

    useBackHandler(() => {
        if (opened.value && isFocused) {
            runOnUI(() => {
                'worklet';
                translation.value = measure(aRef).y;
                opened.value = !opened.value;
            })();
            return true;
        }
        return false;
    });

    useEffect(() => {
        dispatch(getLastPosition(imei));
        dispatch(getPositions(imei));
    }, []);

    return (
        <>
            <StatusBar backgroundColor={'#07C8F9'} />
            <Container>
                <TouchableWithoutFeedback
                    onPress={() => {
                        runOnUI(() => {
                            'worklet';
                            if (translation.value === 0) {
                                translation.value = measure(aRef).height - 50;
                                scrollTo(aRef, 0, 0);
                            }
                            else
                                translation.value = measure(aRef).y;

                            opened.value = !opened.value;
                        })();
                    }}
                >
                    <Header>
                        <>
                            <Title>DADOS DO VEÍCULO</Title>
                            <Icon style={iconStyle} name='down' color='white' size={18} />
                        </>
                    </Header>
                </TouchableWithoutFeedback>
                {
                    loading
                        ? <Loading />
                        :
                        <Content>
                            <Column>
                                <Card style={buttonStyle} onPress={() => navigation.navigate('Map', { latitude: lastPosition.latitude, longitude: lastPosition.longitude })}>
                                    <LastPosition>ULTIMA POSIÇÃO</LastPosition>
                                    <SmallText>Atualizado em {format(new Date(lastPosition.updatedAt), 'dd/MM/yyyy')} as {format(new Date(lastPosition.updatedAt), 'HH:mm')}</SmallText>
                                    <Row>
                                        <Ionicons name='pin' color='white' size={16} />
                                        <Address>Rua das mansões, 240, Esplanada, Paracatu/MG Brasil</Address>
                                    </Row>
                                </Card>
                            </Column>
                            <Scroll style={style} ref={aRef}>
                                {
                                    positions.map((position, index) => (
                                        <Position key={index} {...{ position }} />
                                    ))
                                }
                            </Scroll>
                            <Hidden style={hiddenViewStyle}>
                                <CardInfo />
                                <OptionsContainer>
                                    <RectButton>
                                        <OptionRow>
                                            <IconRow>
                                                <Ionicons name='power-outline' color='white' size={20} />
                                                <OptionLabel>Bloquear Veículo</OptionLabel>
                                            </IconRow>
                                            <Icon name='right' color='white' size={14} />
                                        </OptionRow>
                                    </RectButton>
                                    <RectButton>
                                        <OptionRow>
                                            <IconRow>
                                                <Ionicons name='lock-closed-outline' color='white' size={20} />
                                                <OptionLabel>Ativar Ancoragem</OptionLabel>
                                            </IconRow>
                                            <Icon name='right' color='white' size={14} />
                                        </OptionRow>
                                    </RectButton>
                                    <RectButton>
                                        <OptionRow>
                                            <IconRow>
                                                <Ionicons name='today-outline' color='white' size={20} />
                                                <OptionLabel>Resumo do dia</OptionLabel>
                                            </IconRow>
                                            <Icon name='right' color='white' size={14} />
                                        </OptionRow>
                                    </RectButton>
                                    <RectButton onPress={() => navigation.navigate('Report', { name: 'posições' })}>
                                        <OptionRow>
                                            <IconRow>
                                                <Ionicons name='location-outline' color='white' size={20} />
                                                <OptionLabel>Relatório de posições</OptionLabel>
                                            </IconRow>
                                            <Icon name='right' color='white' size={14} />
                                        </OptionRow>
                                    </RectButton>
                                    <RectButton onPress={() => navigation.navigate('Report', { name: 'trajetos' })}>
                                        <OptionRow>
                                            <IconRow>
                                                <Ionicons name='trail-sign-outline' color='white' size={20} />
                                                <OptionLabel>Relatório de trajetos</OptionLabel>
                                            </IconRow>
                                            <Icon name='right' color='white' size={14} />
                                        </OptionRow>
                                    </RectButton>
                                </OptionsContainer>
                            </Hidden>
                        </Content>
                }
            </Container>
        </>
    );
}
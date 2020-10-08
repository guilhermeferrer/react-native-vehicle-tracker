import React, { useEffect } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useBackHandler } from '@react-native-community/hooks';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RectButton } from 'react-native-gesture-handler';
import { format } from 'date-fns';
import { alert } from '../../services/alert';

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
import { getLastPosition, getPositions, addPosition } from '../../store/modules/position/action';
import { setAnchor } from '../../store/modules/anchor/action';

import { useSharedValue, useAnimatedStyle, withTiming, useDerivedValue, useAnimatedRef, runOnUI, measure, scrollTo } from 'react-native-reanimated';
import io from 'socket.io-client';

export default function Positions({ navigation, route }) {

    const client = io('http://nextfood.kinghost.net:21621');

    const positionListener = () => client.on('position', position => {
        dispatch(addPosition(position));
    });

    const opened = useSharedValue(false);
    const translation = useSharedValue(0);
    const aRef = useAnimatedRef();
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const imei = route.params.imei;

    const lastPosition = useSelector(state => state.position.lastPosition);
    const positions = useSelector(state => state.position.positions);
    const loading = useSelector(state => state.position.loading);
    const loadingPositions = useSelector(state => state.position.loadingPositions);

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
        positionListener();
        client.emit('join', imei);

        return () => client.removeAllListeners();
    }, []);

    function handleChangeOilAndElectricityStatus() {
        client.emit(lastPosition.electricity ? 'block' : 'restore', imei);
        alert('warn', 'Comando enviado!', 'Você receberá uma notificação assim que o rastreador receber o comando');
    }

    function getAnchorState() {
        const { events_config } = lastPosition;

        if (!events_config)
            return false;
        if (!events_config.anchor)
            return false;
        return events_config.anchor.active;
    }

    function handleChangeAnchorStatus() {

        const active = !getAnchorState();

        dispatch(setAnchor(active, imei));
    }

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
                                <Card style={buttonStyle} onPress={() => navigation.navigate('Map', { ...lastPosition, realTime: true })}>
                                    <LastPosition>ULTIMA POSIÇÃO</LastPosition>
                                    <SmallText>Atualizado em {format(new Date(lastPosition.gps_date), 'dd/MM/yyyy')} as {format(new Date(lastPosition.gps_date), 'HH:mm')}</SmallText>
                                    <Row>
                                        <Ionicons name='pin' color='white' size={16} />
                                        <Address>{lastPosition.address ?? 'Sem informação'}</Address>
                                    </Row>
                                </Card>
                            </Column>
                            <Scroll style={style} ref={aRef}>
                                {
                                    loadingPositions ? <Loading /> :
                                        positions.map((position, index) => (
                                            <Position key={index} {...{ position }} />
                                        ))
                                }
                            </Scroll>
                            <Hidden style={hiddenViewStyle}>
                                <CardInfo {...lastPosition} />
                                <OptionsContainer>
                                    <RectButton onPress={handleChangeOilAndElectricityStatus}>
                                        <OptionRow>
                                            <IconRow>
                                                <Ionicons name='power-outline' color='white' size={20} />
                                                <OptionLabel>{lastPosition.electricity ? 'Bloquear Veículo' : 'Desbloquear Veículo'}</OptionLabel>
                                            </IconRow>
                                            <Icon name='right' color='white' size={14} />
                                        </OptionRow>
                                    </RectButton>
                                    <RectButton onPress={handleChangeAnchorStatus}>
                                        <OptionRow>
                                            <IconRow>
                                                <Ionicons name='lock-closed-outline' color='white' size={20} />
                                                <OptionLabel>{getAnchorState() ? 'Desativar' : 'Ativar'} ancoragem</OptionLabel>
                                            </IconRow>
                                            <Icon name='right' color='white' size={14} />
                                        </OptionRow>
                                    </RectButton>
                                    <RectButton onPress={() => navigation.navigate('Routes')}>
                                        <OptionRow>
                                            <IconRow>
                                                <Ionicons name='today-outline' color='white' size={20} />
                                                <OptionLabel>Rotas do dia</OptionLabel>
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
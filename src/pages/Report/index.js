import React, { useState, useEffect } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

import { Container, Header, BackButton, Title, Offset, Content, ContentTitle, DateButton, OptionInfo, Icon, Label, Line, Button, ButtonText, Footer } from './styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector, useDispatch } from 'react-redux';
import { getReportPositions } from '../../store/modules/position/action';

import CloseIcon from 'react-native-vector-icons/AntDesign';
import { format } from 'date-fns';
import { alert } from '../../services/alert';
import genereteHTML from './html';
import FileViewer from 'react-native-file-viewer';
import Spinkit from 'react-native-spinkit';

const Report = ({ navigation, route }) => {
    const { name } = route.params;
    const [loading, setLoading] = useState(null);
    const [visibleStart, setVisibleStart] = useState(false);
    const [visibleEnd, setVisibleEnd] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const vehicle = useSelector(state => state.vehicle.vehicle);
    const reportData = useSelector(state => state.position.reportData);
    const success = useSelector(state => state.position.success);
    const dispatch = useDispatch();

    const { plate, imei } = vehicle;

    useEffect(() => {
        if (success && reportData)
            askPermission();
    }, [success]);

    function handleGetReportData() {
        setLoading(true);
        dispatch(getReportPositions(imei, format(new Date(startDate), 'yyyy-MM-dd'), format(new Date(endDate), 'yyyy-MM-dd')));
    }

    function onChangeStart(event, selectedDate) {
        setVisibleStart(false);
        if (selectedDate)
            setStartDate(new Date(selectedDate));
    }

    function onChangeEnd(event, selectedDate) {
        setVisibleEnd(false);
        if (selectedDate)
            setEndDate(new Date(selectedDate));
    }

    async function createPDF() {
        let options = {
            html: genereteHTML(reportData, 'stops', startDate, endDate, '', plate),
            fileName: `relatório de posições`,
            directory: Platform.OS === 'ios' ? 'Documents' : '/Documents'
        };

        await RNHTMLtoPDF.convert(options)
            .then(response => {
                const path = response.filePath;
                setLoading(false);
                FileViewer.open(path);
            })
            .catch(error => console.log(error));
    }

    function askPermission() {
        if (Platform.OS === 'android') {
            requestExternalWritePermission();
        } else {
            createPDF();
        }
    }

    async function requestExternalWritePermission() {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                createPDF();
            } else {
                alert('error', 'Erro', 'Permissão para criar arquivos no dispositivo negada');
            }

        } catch (err) {
            alert('error', 'Erro ao obter permissões', err);
            console.warn(err);
        }
    }

    return (
        <Container>
            <Header>
                <BackButton onPress={() => navigation.goBack()}>
                    <CloseIcon name='close' size={22} color='rgba(0, 0, 0, .6)' />
                </BackButton>
                <Title>Relatório de {name}</Title>
                <Offset />
            </Header>
            <Content>
                <ContentTitle>Selecione o intervalo</ContentTitle>
                <DateButton onPress={() => setVisibleStart(true)}>
                    <OptionInfo>
                        <Icon source={require('../../assets/images/calendar.png')} />
                        <Label>Data Inicial</Label>
                    </OptionInfo>
                    <Label>{format(startDate, 'dd/MM/yyyy')}</Label>
                </DateButton>
                <Line />
                <DateButton onPress={() => setVisibleEnd(true)}>
                    <OptionInfo>
                        <Icon source={require('../../assets/images/calendar.png')} />
                        <Label>Data Final</Label>
                    </OptionInfo>
                    <Label>{format(endDate, 'dd/MM/yyyy')}</Label>
                </DateButton>
            </Content>
            <Footer>
                <Button onPress={handleGetReportData}>
                    {
                        loading ?
                            <Spinkit color='white' size={22} type='ThreeBounce' />
                            :
                            <ButtonText>Gerar pdf</ButtonText>
                    }
                </Button>
            </Footer>
            {
                visibleStart &&
                <DateTimePicker
                    testID="dateTimePicker"
                    value={startDate}
                    is24Hour={true}
                    display="default"
                    onChange={onChangeStart}
                />
            }
            {
                visibleEnd &&
                <DateTimePicker
                    testID="dateTimePicker"
                    value={endDate}
                    is24Hour={true}
                    display="default"
                    onChange={onChangeEnd}
                />
            }
        </Container>
    )
}

export default Report;
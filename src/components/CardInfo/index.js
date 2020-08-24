import React from 'react';

import {
    Container,
    IconsContainer,
    IconsContainerTitle,
    IconGroup,
    PanelIcon,
    Label,
    IconInfo,
} from './styles';

const CardInfo = () => {
    return (
        <Container>
            <IconsContainerTitle>Informações do veículo</IconsContainerTitle>
            <IconsContainer>
                <IconGroup>
                    <PanelIcon source={require('../../assets/images/speed.png')} />
                    <Label>Velocidade</Label>
                    <IconInfo>15 km/h</IconInfo>
                </IconGroup>
                <IconGroup>
                    <PanelIcon source={require('../../assets/images/tire.png')} />
                    <Label>Ôdometro</Label>
                    <IconInfo>121312 km</IconInfo>
                </IconGroup>
                <IconGroup>
                    <PanelIcon source={require('../../assets/images/temperatura.png')} />
                    <Label>Temperatura</Label>
                    <IconInfo>28°C</IconInfo>
                </IconGroup>
                <IconGroup>
                    <PanelIcon source={require('../../assets/images/battery.png')} />
                    <Label>Bateria</Label>
                    <IconInfo>12 v</IconInfo>
                </IconGroup>
                <IconGroup>
                    <PanelIcon source={require('../../assets/images/mapa.png')} />
                    <Label>Longitude</Label>
                    <IconInfo>-46.880330</IconInfo>
                </IconGroup>
                <IconGroup>
                    <PanelIcon source={require('../../assets/images/mapa.png')} />
                    <Label>Latitude</Label>
                    <IconInfo>-17.225995</IconInfo>
                </IconGroup>
                <IconGroup>
                    <PanelIcon source={require('../../assets/images/norte.png')} />
                    <Label>Direção</Label>
                    <IconInfo>Norte</IconInfo>
                </IconGroup>
                <IconGroup>
                    <PanelIcon source={require('../../assets/images/radar.png')} />
                    <Label>Equipamento</Label>
                    <IconInfo>GT06</IconInfo>
                </IconGroup>
            </IconsContainer>
        </Container>
    );
}

export default CardInfo;
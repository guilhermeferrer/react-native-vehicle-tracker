import React from 'react';
import { StatusBar } from 'react-native';

import { Container } from './styles';

export default function StatusBarComponent({ backgroundColor = 'transparent', barStyle = 'light-content', position = 'relative' }) {
    return (
        <Container
            backgroundColor={backgroundColor}
            position={position}
        >
            <StatusBar
                translucent
                backgroundColor='transparent'
                barStyle={barStyle}
            />
        </Container>
    );
}
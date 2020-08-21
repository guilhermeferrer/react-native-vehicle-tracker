import React from 'react';
import { StatusBar } from 'react-native';

import { Container } from './styles';

export default function StatusBarComponent({ backgroundColor = 'black', barStyle = 'light-content' }) {
    return (
        <Container backgroundColor={backgroundColor}>
            <StatusBar
                translucent
                backgroundColor='transparent'
                barStyle={barStyle}
            />
        </Container>
    );
}
import React from 'react';
import Spinkit from 'react-native-spinkit';

import { Container } from './styles';

const Loading = () => {
    return (
        <Container>
            <Spinkit color='white' size={28} type='ThreeBounce' />
        </Container>
    );
}

export default Loading;
import styled from 'styled-components';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const Container = styled.View`
    width: 100%;
    height: ${getStatusBarHeight()}px;
    background: ${props => props.backgroundColor};
    position: ${props => props.position};
`;
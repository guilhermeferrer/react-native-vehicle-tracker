import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
`;

export const Backdrop = styled.View`
    background: #0A8CB9;
    opacity: .2;
    z-index: 100;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;

export const Card = styled.View`
    position: absolute;
    bottom: 20px;
    width: 90%;
    margin-left: 5%;
    border-radius: 4px;
    z-index: 200;
`;
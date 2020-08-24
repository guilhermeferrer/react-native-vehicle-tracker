import styled from 'styled-components/native';

export const Container = styled.View`
    border-radius: 6px;
    background: rgba(0, 0, 0, .15);
    width: 100%;
    padding-top: 15px;  
`;

export const PanelIcon = styled.Image`
    width: 25px;
    height: 25px;
    resize-mode: contain;
`;

export const IconsContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
`;

export const IconsContainerTitle = styled.Text`
    color: white;
    font-size: 18px;
    margin-bottom: 15px;
    margin-left: 15px;
    font-family: 'RussoOne-Regular';
`;

export const IconGroup = styled.View`
    justify-content: center;
    align-items: center;
    width: 25%;
    margin-bottom: 20px;
`;

export const Label = styled.Text`
    font-size: 10px;
    color: rgba(255, 255, 255, .6);
`;

export const IconInfo = styled.Text`
    font-size: 12px;
    color: white;
`;
import styled from 'styled-components/native';

export const Container = styled.View`
    background-color: #fff;
    height: 100%;
`;

export const Prompt = styled.Text`
    font-size: 17px;
    text-align: center;
    margin: auto 0;
`;

export const Footer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: absolute;
    border-top-width: 1px;
    border-top-color: #DCDCDC;
    padding: 10px;
    width: 100%;
    bottom: 0;
`;

export const FooterItem = styled.Text`
    color: #000;
    font-size: 16px;
`;
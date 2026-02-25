import React from 'react';
import styled from 'styled-components/native';
import Back from './Back';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface TopProps {
    navigation: NativeStackNavigationProp<any>;
    text: string;
}

const TopWrapper = styled.View`
    width: 100%;
    height: 10%;
    background-color: red;
    justify-content: center;
`;

const TopText = styled.Text`
    font-size: 14px;
    text-align: center;
`;

function Top({ navigation, text }: TopProps) {
    return (
        <TopWrapper>
            <Back navigation={navigation} />
            <TopText>{text}</TopText>
        </TopWrapper>
    );
}

export default Top;

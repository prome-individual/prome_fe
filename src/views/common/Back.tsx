import styled from 'styled-components/native';
import { Image, TouchableOpacity } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface BackProps {
    navigation: NativeStackNavigationProp<any>;
}

const BackImg = styled(Image)`
    width: 100%;
    height: 100%;
    resize-mode: contain;
`;

const BackButton = styled(TouchableOpacity)`
    position: absolute;
    width: 5%;
    aspect-ratio: 1;
    left: 3%;
    z-index: 1;
    justify-content: center;
    align-items: center;
`;

function Back({ navigation }: BackProps) {
    return (
        <BackButton onPress={() => navigation.pop()}>
            <BackImg source={require('../../assets/back.png')} />
        </BackButton>
    );
}

export default Back;

import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import Colors from '../../styles/Colors';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path } from 'react-native-svg';

const SafeView = styled(SafeAreaView)`
    flex: 1;
`;

const Container = styled.View`
    flex: 1;
    position: relative;
`;

const Gradient = styled(LinearGradient).attrs({
    colors: Colors.background.gradient,
    start: {x: 0, y: 0.5},
    end: {x: 0, y: 1},
    opacity: Colors.background.opacity,
})`
    flex: 1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

const Welcome = styled.View`
    padding-top: 30%;
    width: 80%;
    justify-content: center;
    align-self: center;
`;

const WelcomeTitle = styled.Text`
    font-size: 24px;
    text-align: center;
`;

const WelcomeDesc = styled.Text`
    font-size: 14px;
    text-align: center;
`;

const Button = styled(TouchableOpacity)`
    background-color: #d3d3d3;
`;

const ButtonText = styled.Text`
    font-size: 14px;
    color: #FE4443;
    text-align: center;
    justify-content: center;
`;

const OKScreen = ({ navigation }) => {
    return (
        <SafeView>
            <Container>
                <Gradient />
                <Welcome>
                    <WelcomeTitle>환영합니다!</WelcomeTitle>
                    <WelcomeDesc>이제부터 콩콩과 함께</WelcomeDesc>
                    <WelcomeDesc>심전도 검사를 진행해요.</WelcomeDesc>
                </Welcome>
                <Button>
                    <ButtonText>다음</ButtonText>
                </Button>
            </Container>
        </SafeView>

    );
};

export default OKScreen;

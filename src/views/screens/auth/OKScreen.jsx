import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import Colors from '../../styles/Colors';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path, Circle } from 'react-native-svg';
import Back from '../../common/Back';

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

const BackgroundVectors = styled.View`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
`;

const Welcome = styled.View`
    padding-top: 30%;
    width: 80%;
    justify-content: center;
    align-self: center;
    z-index: 2;
`;

const WelcomeTitle = styled.Text`
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    padding-bottom: 12px;
`;

const WelcomeDesc = styled.Text`
    font-size: 14px;
    text-align: center;
`;

const Kongs = styled.View`
    width: 100%;
    height: 60%;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 2;
`;

const Kong = styled.Text`
    font-size: 80px;
    font-weight: 100;
    color: ${Colors.primary};
    opacity: 0.6;
    position: absolute;
`;

const Button = styled(TouchableOpacity)`
    background-color: white;
    width: 83%;
    height: 6%;
    align-self: center;
    justify-content: center;
    border-radius: 8px;
    z-index: 2;
`;

const ButtonText = styled.Text`
    font-size: 20px;
    font-weight: 600;
    color: ${Colors.primary};
    text-align: center;
`;

const OKScreen = ({ navigation }) => {
    return (
        <SafeView>
            <Container>
                <Back navigation={navigation}/>
                <Gradient />
                
                {/* Background Vectors */}
                <BackgroundVectors>
                    <Svg width="100%" height="100%" style={{ position: 'absolute' }}>
                        {/* Top left flowing curve */}
                        <Path
                            d="M 0 40 Q 20 0, 80 50 Q 110 80, 140 60"
                            stroke={Colors.primary}
                            strokeWidth="2"
                            strokeDasharray="4,6"
                            fill="none"
                            opacity="0.7"
                        />
                        <Circle cx="70" cy="100" r="5" fill={Colors.primary} opacity="0.8" />
                        <Circle cx="85" cy="130" r="3" fill={Colors.primary} opacity="0.6" />
                        
                        {/* Top right large curve */}
                        <Path
                            d="M 280 30 Q 320 10, 350 40 Q 380 70, 410 50 Q 440 30, 470 60"
                            stroke={Colors.primary}
                            strokeWidth="2"
                            strokeDasharray="4,6"
                            fill="none"
                            opacity="0.7"
                        />
                        <Circle cx="390" cy="50" r="4" fill={Colors.primary} opacity="0.7" />
                        
                        {/* Left side flowing curve */}
                        <Path
                            d="M 5 180 Q 35 160, 65 190 Q 95 220, 125 200 Q 155 180, 185 210"
                            stroke={Colors.primary}
                            strokeWidth="2"
                            strokeDasharray="4,6"
                            fill="none"
                            opacity="0.6"
                        />
                        <Circle cx="20" cy="250" r="7" fill={Colors.primary} opacity="0.8" />
                        <Circle cx="35" cy="280" r="4" fill={Colors.primary} opacity="0.6" />
                        
                        {/* Middle wave curve */}
                        <Path
                            d="M 120 280 Q 160 260, 200 290 Q 240 320, 280 300 Q 320 280, 360 310"
                            stroke={Colors.primary}
                            strokeWidth="2"
                            strokeDasharray="4,6"
                            fill="none"
                            opacity="0.7"
                        />
                        <Circle cx="190" cy="350" r="3" fill={Colors.primary} opacity="0.6" />
                        <Circle cx="250" cy="380" r="4" fill={Colors.primary} opacity="0.7" />
                        
                        {/* Bottom left gentle curve */}
                        <Path
                            d="M 30 480 Q 70 460, 110 490 Q 150 520, 190 500 Q 230 480, 270 510"
                            stroke={Colors.primary}
                            strokeWidth="2"
                            strokeDasharray="4,6"
                            fill="none"
                            opacity="0.6"
                        />
                        <Circle cx="10" cy="600" r="6" fill={Colors.primary} opacity="0.8" />
                        
                        {/* Bottom right sweeping curve */}
                        <Path
                            d="M 220 560 Q 260 540, 300 570 Q 340 600, 380 580 Q 420 560, 460 590"
                            stroke={Colors.primary}
                            strokeWidth="2"
                            strokeDasharray="4,6"
                            fill="none"
                            opacity="0.7"
                        />
                        <Circle cx="320" cy="620" r="4" fill={Colors.primary} opacity="0.7" />
                        <Circle cx="380" cy="650" r="3" fill={Colors.primary} opacity="0.6" />
                        
                        {/* Additional flowing curves for depth */}
                        <Path
                            d="M 100 120 Q 140 100, 180 130 Q 220 160, 260 140"
                            stroke={Colors.primary}
                            strokeWidth="1.5"
                            strokeDasharray="3,8"
                            fill="none"
                            opacity="0.5"
                        />
                        
                        <Path
                            d="M 300 200 Q 340 180, 380 210 Q 420 240, 460 220"
                            stroke={Colors.primary}
                            strokeWidth="1.5"
                            strokeDasharray="3,8"
                            fill="none"
                            opacity="0.5"
                        />
                        
                        <Path
                            d="M 40 380 Q 80 360, 120 390 Q 160 420, 200 400"
                            stroke={Colors.primary}
                            strokeWidth="1.5"
                            strokeDasharray="3,8"
                            fill="none"
                            opacity="0.5"
                        />
                        
                        {/* Small scattered dots */}
                        <Circle cx="150" cy="80" r="2" fill={Colors.primary} opacity="0.4" />
                        <Circle cx="320" cy="150" r="2" fill={Colors.primary} opacity="0.4" />
                        <Circle cx="80" cy="320" r="2" fill={Colors.primary} opacity="0.4" />
                        <Circle cx="280" cy="450" r="2" fill={Colors.primary} opacity="0.4" />
                        <Circle cx="180" cy="520" r="2" fill={Colors.primary} opacity="0.4" />
                    </Svg>
                </BackgroundVectors>
                
                <Welcome>
                    <WelcomeTitle>환영합니다 !</WelcomeTitle>
                    <WelcomeDesc style={{color: Colors.primary}}>이제부터 콩콩과 함께</WelcomeDesc>
                    <WelcomeDesc style={{color: Colors.primary}}>심전도 검사를 진행해요.</WelcomeDesc>
                </Welcome>
                
                <Kongs>
                    <Kong style={{ top: '10%', left: '40%', transform: 'rotate(-10deg)' }}>콩</Kong>
                    <Kong style={{ top: '20%', right: '30%', transform: 'rotate(15deg)' }}>콩</Kong>
                    <Kong style={{ top: '0%', right: '2%', transform: 'rotate(5deg)', opacity: 0.3 }}>콩</Kong>
                    <Kong style={{ bottom: '20%', left: '20%', transform: 'rotate(15deg)' }}>콩</Kong>
                </Kongs>
                
                <Button onPress={() => navigation.navigate("Login")}>
                    <ButtonText>다음</ButtonText>
                </Button>
            </Container>
        </SafeView>
    );
};

export default OKScreen;

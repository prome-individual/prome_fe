import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import Back from '../../common/Back';


const SafeView = styled(SafeAreaView)`
    flex: 1;
`;

const Container = styled.View`
    flex: 1;
    background-color: white;
    width: 100%;
`;

const Top = styled.View`
    flex: 1;
    width: 100%;
    justify-content: center;
    align-self: center;
    height: 20%;
`;

const TopImg = styled(Image)`
    width: 100%;
    height: 100%;
    resize-mode: cover;
`;

const TopText = styled.Text`
    position: absolute;
    color: white;
    font-size: 16px;
    z-index: 1;
    top: 0;
`;

const Img = styled(Image)`
    align-self: center;
    height: 20%;
    width: 80%;
    resize-mode: cover;
`;

const ExpText = styled.Text`
    color: black;
    font-size: 16px;
`;

const QuestionWrapper = styled.View`
    flex-direction: row;
    width: 90%;
    height: 30%;
    align-self: center;
    justify-content: center;
`;

const Question = styled.View`
    width: 40%;
    background-color: gray;
    justify-content: center;
    margin: 10%;
`;

const QuestionText = styled.Text`
    font-size: 18px;
    text-align: center;
    color: white;
`;

const MainScreen = ({ navigation }) => {

    return (
        <SafeView>
            <Container>
                <Top>
                    <Back navigation={navigation} />
                    <TopText>심전도 검사를 통해 건강을 체크하세요!</TopText>
                    <TopImg source={require('../../../assets/medical.png')} />
                </Top>
                <ExpText>심전도 검사를 실행해보세요!</ExpText>
                <Img source={require('../../../assets/medical.png')} />
                <ExpText>AI 챗봇에게 질문해보세요!</ExpText>
                <QuestionWrapper>
                    <Question>
                        <QuestionText>질의응답</QuestionText>
                    </Question>
                    <Question>
                        <QuestionText>실시간 질문</QuestionText>
                    </Question>
                </QuestionWrapper>
                <ExpText>이전 기록을 확인해보세요!</ExpText>
                <Img source={require('../../../assets/medical.png')} />
            </Container>
        </SafeView>
    );


};
export default MainScreen;

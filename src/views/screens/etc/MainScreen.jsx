import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import Back from '../../common/Back';
import Colors from '../../styles/Colors';
import TabBar from '../../common/TabBar';
import Hospital from '../../components/etc/Hospital';
import History from '../../components/etc/History';

const SafeView = styled(SafeAreaView)`
    flex: 1;
`;

const Container = styled.View`
    flex: 1;
    background-color: white;
    width: 100%;
`;

const Top = styled.View`
    width: 100%;
    height: 16%;
    justify-content: center;
    align-self: center;
    background-color: ${Colors.primary};
`;

const TopText = styled.Text`
    position: absolute;
    color: white;
    font-size: 14px;
    z-index: 1;
`;

const ExpText = styled.Text`
    color: black;
    font-size: 18px;
    margin-top: 10%;
    margin-left: 5%;
`;

const QuestionWrapper = styled.View`
    flex-direction: row;
    width: 90%;
    height: 25%;
    align-self: center;
    justify-content: center;
    gap: 10px;
    margin-top: 2%;
`;

const QuestionLeft = styled(TouchableOpacity)`
    flex: 10;
    background-color: ${Colors.sky};
    justify-content: center;
    border-radius: 12px;
    border: 1px solid ${Colors.primary};
`;

const QuestionLeftText = styled.Text`
    font-size: 18px;
    text-align: center;
    color: black;
`;

const QuestionRightWrapper = styled.View`
    flex-direction: column;
    flex: 10;
    gap: 10px;
`;

const QuestionRight = styled(TouchableOpacity)`
    flex: 1;
    justify-content: center;
    border-radius: 12px;
    padding: 10px;
    border: 1px solid ${Colors.primary};
`;

const QuestionRightText = styled.Text`
    font-size: 14px;
    text-align: center;
    color: black;
`;

const Red = styled.Text`
    color: ${Colors.primary};
`;

const Wrap = styled.View`
    border-radius: 12px;
    width: 90%;
    background-color: ${Colors.buttonWrapper};
    justify-content: center;
    align-self: center;
    margin-top: 5%;
    flex-direction: row;
    gap: 10px;
    padding: 5px;
`;

const Select = styled(TouchableOpacity)`
    border-radius: 12px;
    background-color: ${props => props.selected ? Colors.primary : 'white'};
    border: 1px solid ${props => props.selected ? Colors.primary : '#BCBCBC'};
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const SelectText = styled.Text`
    font-size: 14px;
    color: ${props => props.selected ? 'white' : '#BCBCBC'};
    text-align: center;
`;

const MainScreen = ({ navigation }) => {
    const [selectedTab, setSelectedTab] = useState('병원찾기');

    return (
        <SafeView>
            <Container>
                <Top>
                    <Back navigation={navigation} />
                    <TopText style={{  top: 10, left: 10 }}>이런 심전도 검사는 어때요?</TopText>
                    <TopText style={{  top: 80, right: 10 }}>심전도 검사 하러가기 !!</TopText>
                </Top>
                <ExpText>AI 챗봇에게 질문해보세요!</ExpText>
                <QuestionWrapper>
                    <QuestionLeft>
                        <QuestionLeftText>즉시 답해드려요</QuestionLeftText>
                    </QuestionLeft>
                    <QuestionRightWrapper>
                        <QuestionRight>
                            <QuestionRightText>가장 많이 한 질문</QuestionRightText>
                        </QuestionRight>
                        <QuestionRight>
                            <QuestionRightText><Red>콩콩봇이란 ?</Red></QuestionRightText>
                        </QuestionRight>
                    </QuestionRightWrapper>
                </QuestionWrapper>
                <Wrap style={{ height: '7%' }}>
                    <Select
                        selected={selectedTab === '병원찾기'}
                        onPress={() => setSelectedTab(selectedTab === '병원찾기' ? '' : '병원찾기')}
                    >
                        <SelectText selected={selectedTab === '병원찾기'}>병원 찾기</SelectText>
                    </Select>
                    <Select
                        selected={selectedTab === '이전기록'}
                        onPress={() => setSelectedTab(selectedTab === '이전기록' ? '' : '이전기록')}
                    >
                        <SelectText selected={selectedTab === '이전기록'}>이전 기록들</SelectText>
                    </Select>
                </Wrap>
                <Wrap style={{ height: '21%' }}>
                    {selectedTab === '병원찾기' ? <Hospital navigation={navigation} /> : selectedTab === '이전기록' ? <History navigation={navigation} /> : null}
                </Wrap>
                <TabBar navigation={navigation} />
            </Container>
        </SafeView>
    );


};
export default MainScreen;

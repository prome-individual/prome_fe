import React from 'react';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import Top from '../../common/Top';

const SafeView = styled(SafeAreaView)`
    flex: 1;
`;

const Container = styled.View`
    flex: 1;
    background-color: white;
`;

const ExpText = styled.Text`
    font-size: 14px;
`;

const Img = styled(Image)`
    width: 90%;
    height: 20%;
    align-self: center;
`;

const PreviousWrapper = styled.View`
    flex-direction: row;
`;

const Previous = styled.View`
    width: 25%;
    height: 20%;
    align-self: center;
    justify-content: space-between;
    background-color: red;

`;

const PreviousText = styled.Text`
    font-size: 14px;
`;
const ChatPeriodSelectScreen = ({ navigation }) => {
    return (
        <SafeView>
            <Top navigation={navigation} text={'이전 기록들을 확인해보세요!'} />
            <Container>
                <ExpText>방금 한 검사를 확인해보세요!</ExpText>
                <Img source={require('../../../assets/medical.png')} />
                <ExpText>이전 기록을 모아놨어요!</ExpText>
                <PreviousWrapper>
                    <Previous>
                        <PreviousText>7일 이내</PreviousText>
                    </Previous>
                    <Previous>
                        <PreviousText>한 달 이내</PreviousText>
                    </Previous>
                    <Previous>
                        <PreviousText>3개월 이내</PreviousText>
                    </Previous>
                </PreviousWrapper>
                <ExpText>달력으로도 확인해보세요!</ExpText>
            </Container>
        </SafeView>
    );
};

export default ChatPeriodSelectScreen;

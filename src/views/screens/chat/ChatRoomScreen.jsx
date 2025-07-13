import React from 'react';
import { ScrollView, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import Colors from '../../styles/Colors';
import LinearGradient from 'react-native-linear-gradient';
import { Svg, Line, Circle } from 'react-native-svg';

const SafeView = styled(SafeAreaView)`
    flex: 1;
`;

const Container = styled.View`
    flex: 1;
    background-color: ${Colors.background.bg};
`;

const KeyboardView = styled(KeyboardAvoidingView)`
    flex: 1;
`;

const Scroll = styled(ScrollView)`
    flex: 1;
    padding: 20px;
`;

const Gradient = styled(LinearGradient).attrs({
    colors: Colors.background.gradientReverse,
    start: {x: 0, y: 0},
    end: {x: 0, y: 1},
    opacity: 0.14,
})`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

const Top = styled.View`
    height: 20%;
    justify-content: center;
    align-items: center;
    position: relative;
`;

const TopText = styled.Text`
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 24px;
`;

const Date = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    position: absolute;
    bottom: 20px;
    z-index: 2;
`;

const DateText = styled.Text`
    font-size: 14px;
    color: #000000;
    opacity: 0.7;
    text-align: center;
    margin: 0 15px;
    font-weight: 500;
`;

const LineContainer = styled.View`
    flex: 1;
    height: 1px;
    justify-content: center;
`;

const KongContainer = styled.View`
    align-items: center;
    justify-content: center;
    margin: 20px 0;
`;

const SmallKongIcon = styled.View`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: ${Colors.primary};
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -10px;
    left: 20px;
    z-index: 3;
`;

const SmallKongImage = styled(Image)`
    width: 30px;
    height: 30px;
    resize-mode: contain;
`;

const LargeKongIcon = styled.View`
    width: 80px;
    height: 80px;
    border-radius: 40px;
    background-color: #DEF3FB;
    border: 3px solid ${Colors.primary};
    justify-content: center;
    align-items: center;
    position: relative;
`;

const LargeKongImage = styled(Image)`
    width: 60px;
    height: 60px;
    resize-mode: contain;
`;

const WelcomeMessage = styled.Text`
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    color: #333;
    margin: 20px 0;
`;

const Chat = styled.View`
    border: 2px solid ${Colors.primary};
    border-radius: 20px;
    background-color: white;
    padding: 16px;
    margin: 10px 0;
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.1;
    shadow-radius: 4px;
    elevation: 3;
`;

const ChatText = styled.Text`
    text-align: center;
    font-size: 16px;
    color: #333;
    line-height: 22px;
`;

const SelectWrapper = styled.View`
    flex-direction: row;
    padding-top: 5px;
    padding-bottom: 5px;
`;

const Select = styled(TouchableOpacity)`
    justify-content: center;
    align-self: center;
    background-color: #F4F4F4;
    border-radius: 30px;
    border: 1px solid #D4AAAA;
`;

const SelectText = styled.Text`
    font-size: 14px;
    color: #171717;
    padding: 10px;
`;

const InputSection = styled.View`
    width: 100%;
    background-color: ${Colors.background.bg};
    padding: 16px 20px;
    border-top-width: 1px;
    border-top-color: #f0f0f0;
    flex-direction: row;
    align-items: center;
    gap: 12px;
`;

const IconButton = styled(TouchableOpacity)`
    width: 48px;
    height: 48px;
    border-radius: 24px;
    background-color: ${Colors.primary};
    justify-content: center;
    align-items: center;
`;

const IconImage = styled(Image)`
    width: 24px;
    height: 24px;
    resize-mode: contain;
    tint-color: white;
`;

const InputWrapper = styled.View`
    flex: 1;
    background-color: white;
    border-radius: 25px;
    border: 1px solid #ddd;
    padding: 4px 20px;
    flex-direction: row;
    align-items: center;
    min-height: 48px;
`;

const Input = styled(TextInput)`
    flex: 1;
    font-size: 16px;
    color: #333;
`;

const Send = styled(TouchableOpacity)`
    width: 48px;
    height: 48px;
    background-color: ${Colors.primary};
    border-radius: 24px;
    justify-content: center;
    align-items: center;
`;

const SendCheck = styled.Text`
    font-size: 14px;
    text-align: center;
    color: white;
    font-weight: 600;
`;

const ChatRoomScreen = ({ navigation }) => {
    return (
        <SafeView>
            <Container>
                <Top>
                    <Gradient />
                    <TopText>콩콩봇</TopText>
                    <Date>
                        <LineContainer>
                            <Svg width="100%" height="2">
                                <Line
                                    x1="0"
                                    y1="1"
                                    x2="100%"
                                    y2="1"
                                    stroke="#000000"
                                    strokeWidth="1"
                                    opacity="0.3"
                                />
                            </Svg>
                        </LineContainer>
                        <DateText>오늘</DateText>
                        <LineContainer>
                            <Svg width="100%" height="2">
                                <Line
                                    x1="0"
                                    y1="1"
                                    x2="100%"
                                    y2="1"
                                    stroke="#000000"
                                    strokeWidth="1"
                                    opacity="0.3"
                                />
                            </Svg>
                        </LineContainer>
                    </Date>
                </Top>

                <KongContainer>
                    <LargeKongIcon>
                        <LargeKongImage source={require('../../../assets/kong.png')} />
                        <SmallKongIcon>
                            <SmallKongImage source={require('../../../assets/kong.png')} />
                        </SmallKongIcon>
                    </LargeKongIcon>
                </KongContainer>

                <WelcomeMessage>김미소님, 무엇을 도와드릴까요?</WelcomeMessage>

                <KeyboardView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
                >
                    <Scroll
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        <Chat style={{width: '50%'}}>
                            <ChatText>안녕하세요, 콩콩봇입니다</ChatText>
                        </Chat>
                        <Chat style={{width: '65%'}}>
                            <ChatText>문의하실 내용을 간단히 입력하시거나, 아래 버튼을 선택해주세요</ChatText>
                        </Chat>
                        <SelectWrapper>
                            <Select>
                                <SelectText>심전도 검사</SelectText>
                            </Select>
                            <Select>
                                <SelectText>질의 응답</SelectText>
                            </Select>
                        </SelectWrapper>
                        <SelectWrapper>
                            <Select>
                                <SelectText>심전도 검사 관련 질문</SelectText>
                            </Select>
                            <Select>
                                <SelectText>기록 보기</SelectText>
                            </Select>
                        </SelectWrapper>
                        <SelectWrapper>
                            <Select>
                                <SelectText>기타 서비스 문의</SelectText>
                            </Select>
                        </SelectWrapper>
                    </Scroll>
                     <InputSection>
                        <IconButton>
                            <IconImage source={require('../../../assets/home.png')} />
                        </IconButton>
                        <IconButton>
                            <IconImage source={require('../../../assets/box.png')} />
                        </IconButton>
                        <InputWrapper>
                            <Input
                                placeholder="메시지를 입력해주세요"
                                multiline={false}
                            />
                        </InputWrapper>
                        <Send>
                            <SendCheck>전송</SendCheck>
                        </Send>
                    </InputSection>
                </KeyboardView>
            </Container>
        </SafeView>
    );
};

export default ChatRoomScreen;

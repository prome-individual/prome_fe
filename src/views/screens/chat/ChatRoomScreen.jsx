import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, Image, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import Colors from '../../styles/Colors';
import LinearGradient from 'react-native-linear-gradient';
import { Svg, Line } from 'react-native-svg';
import Back from '../../common/Back';
import useFullScreen from '../../hooks/useFullScreen';
import Fontsizes from '../../styles/fontsizes';

const SafeView = styled(SafeAreaView)`
    flex: 1;
    background-color: ${Colors.background.bg};
`;

const Container = styled.View`
    flex: 1;
    background-color: ${Colors.background.bg};
`;

const Top = styled.View`
    height: ${props => props.keyboardVisible ? '10%' : '20%'};
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: ${Colors.background.bg};
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

const TopText = styled.Text`
    font-size: ${Fontsizes.mm};
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

const ChatScrollView = styled(ScrollView)`
    flex: 1;
    padding: 20px;
`;

// Kong 정보
const Kong = styled.View`
    flex-direction: row;
    align-items: center;
    padding-left: 10px;
    margin-bottom: 10px;
`;

const SmallKongIcon = styled.View`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    border: 1px solid ${Colors.primary};
    background-color: white;
    justify-content: center;
    align-items: center;
    margin-right: 8px;
`;

const SmallKongImage = styled(Image)`
    width: 30px;
    height: 30px;
    resize-mode: contain;
`;

const KongText = styled.Text`
    color: #171717;
    opacity: 0.68;
    margin-right: 10px;
`;

// 환영 메시지 영역
const KongContainer = styled.View`
    align-items: center;
    justify-content: center;
    margin: 20px 0;
`;

const LargeKongIcon = styled.View`
    width: 80px;
    height: 80px;
    border-radius: 40px;
    background-color: #DEF3FB;
    border: 3px solid ${Colors.primary};
    justify-content: center;
    align-items: center;
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

const ChatMessage = styled.View`
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
    align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
    max-width: 80%;
`;

const ChatText = styled.Text`
    font-size: 16px;
    color: #333;
    line-height: 22px;
`;

const SelectWrapper = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    padding: 5px 0;
    gap: 8px;
`;

const Select = styled(TouchableOpacity)`
    background-color: #F4F4F4;
    border-radius: 30px;
    border: 1px solid #D4AAAA;
    padding: 10px 16px;
`;

const SelectText = styled.Text`
    font-size: 14px;
    color: #171717;
`;

const InputSection = styled.View`
    background-color: ${Colors.background.bg};
    padding: 16px 20px;
    padding-bottom: 20px;
    border-top-width: 1px;
    border-top-color: #f0f0f0;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    min-height: 80px;
`;

const IconButton = styled(TouchableOpacity)`
    width: 40px;
    height: 40px;
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
    max-height: 100px;
`;

const ChatRoomScreen = ({ navigation }) => {
    const { enableFullScreen, disableFullScreen } = useFullScreen();
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        enableFullScreen();
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            disableFullScreen();
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, [enableFullScreen, disableFullScreen]);

    const [messages, setMessages] = useState([
        { id: 1, text: '안녕하세요, 콩콩봇입니다', isUser: false },
        { id: 2, text: '문의하실 내용을 간단히 입력하시거나, 아래 버튼을 선택해주세요', isUser: false },
    ]);
    const [inputText, setInputText] = useState('');
    const scrollViewRef = useRef(null);

    const sendMessage = () => {
        if (inputText.trim()) {
            const newMessage = {
                id: messages.length + 1,
                text: inputText,
                isUser: true,
            };
            setMessages([...messages, newMessage]);
            setInputText('');
            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
            }, 100);
            setTimeout(() => {
                const botResponse = {
                    id: messages.length + 2,
                    text: '메시지를 받았습니다. 어떻게 도와드릴까요?',
                    isUser: false,
                };
                setMessages(prev => [...prev, botResponse]);
                setTimeout(() => {
                    scrollViewRef.current?.scrollToEnd({ animated: true });
                }, 100);
            }, 1000);
        }
    };

    const handleQuickSelect = (text) => {
        const newMessage = {
            id: messages.length + 1,
            text: text,
            isUser: true,
        };
        setMessages([...messages, newMessage]);
        
        setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
        
        setTimeout(() => {
            const botResponse = {
                id: messages.length + 2,
                text: `${text}에 대해 도움을 드리겠습니다.`,
                isUser: false,
            };
            setMessages(prev => [...prev, botResponse]);
            
            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
            }, 100);
        }, 1000);
    };

    return (
        <SafeView edges={[]}>
            <Container>
                <Top keyboardVisible={keyboardVisible}>
                    <Back navigation={navigation} />
                    <Gradient />
                    <TopText>콩콩봇</TopText>
                    {!keyboardVisible && (
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
                    )}
                </Top>

                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
                >
                    <ChatScrollView
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                        ref={scrollViewRef}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    >
                        <Kong>
                            <SmallKongIcon>
                                <SmallKongImage source={require('../../../assets/kong.png')} />
                            </SmallKongIcon>
                            <KongText style={{ fontSize: 14, paddingLeft: 10 }}>콩콩봇</KongText>
                            <KongText style={{ fontSize: 12 }}>13:42</KongText>
                        </Kong>

                        <KongContainer>
                            <LargeKongIcon>
                                <LargeKongImage source={require('../../../assets/kong.png')} />
                            </LargeKongIcon>
                        </KongContainer>

                        <WelcomeMessage>김미소님, 무엇을 도와드릴까요?</WelcomeMessage>

                        {messages.map((message) => (
                            <ChatMessage key={message.id} isUser={message.isUser}>
                                <ChatText>{message.text}</ChatText>
                            </ChatMessage>
                        ))}

                        {messages.length <= 2 && !keyboardVisible && (
                            <>
                                <SelectWrapper>
                                    <Select onPress={() => handleQuickSelect('심전도 검사')}>
                                        <SelectText>심전도 검사</SelectText>
                                    </Select>
                                    <Select onPress={() => handleQuickSelect('질의 응답')}>
                                        <SelectText>질의 응답</SelectText>
                                    </Select>
                                </SelectWrapper>
                                <SelectWrapper>
                                    <Select onPress={() => handleQuickSelect('심전도 검사 관련 질문')}>
                                        <SelectText>심전도 검사 관련 질문</SelectText>
                                    </Select>
                                    <Select onPress={() => handleQuickSelect('기록 보기')}>
                                        <SelectText>기록 보기</SelectText>
                                    </Select>
                                </SelectWrapper>
                                <SelectWrapper>
                                    <Select onPress={() => handleQuickSelect('기타 서비스 문의')}>
                                        <SelectText>기타 서비스 문의</SelectText>
                                    </Select>
                                </SelectWrapper>
                            </>
                        )}
                    </ChatScrollView>

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
                                multiline={true}
                                value={inputText}
                                onChangeText={setInputText}
                                onSubmitEditing={sendMessage}
                                blurOnSubmit={true}
                                returnKeyType="send"
                            />
                        </InputWrapper>
                    </InputSection>
                </KeyboardAvoidingView>
            </Container>
        </SafeView>
    );
};

export default ChatRoomScreen;

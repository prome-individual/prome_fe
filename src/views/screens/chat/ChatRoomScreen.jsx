import React from 'react';
import { ScrollView, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import Chat from '../../components/chat/Chat';
import Top from '../../common/Top';

const SafeView = styled(SafeAreaView)`
    flex: 1;
`;

const Container = styled.View`
    flex: 1;
    background-color: white;
`;

const KeyboardView = styled(KeyboardAvoidingView)`
    flex: 1;
`;

const Scroll = styled(ScrollView)`
    flex: 1;
    background-color: gray;
`;

const InputSection = styled.View`
    width: 100%;
    height: 20%;
    background-color: green;
    padding: 10px;
`;

const InputExp = styled.Text`
    font-size: 14px;
    margin-bottom: 5px;
`;

const InputArticle = styled.View`
    flex-direction: row;
    align-self: center;
    align-items: center;
`;

const Input = styled(TextInput)`
    width: 80%;
    background-color: white;
    border-radius: 8px;
    margin-bottom: 5%;
    font-size: 14px;
`;

const Send = styled(TouchableOpacity)`
    width: 10%;
    aspect-ratio: 1;
    background-color: white;
    border-radius: 8px;
    margin-left: 5%;
    justify-content: center;
`;

const SendCheck = styled.Text`
    font-size: 14px;
    text-align: center;
`;

const ChatRoomScreen = ({ navigation }) => {
    return (
        <SafeView>
            <Container>
                <Top navigation={navigation} text={'AI 챗봇에게 건강 상태를 체크해보세요!'} />
                <KeyboardView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
                >
                    <Scroll
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        <Chat isQuestion={true} />
                        <Chat isQuestion={false} />
                        <Chat isQuestion={true} />
                        <Chat isQuestion={false} />
                        <Chat isQuestion={true} />
                        <Chat isQuestion={false} />
                        <Chat isQuestion={true} />
                        <Chat isQuestion={false} />
                        <Chat isQuestion={true} />
                        <Chat isQuestion={false} />
                    </Scroll>
                    <InputSection>
                        <InputExp>사용자 입력 창</InputExp>
                        <InputArticle>
                            <Input
                                placeholder="질문을 입력하세요..."
                                multiline={false}
                            />
                            <Send>
                                <SendCheck>보내기</SendCheck>
                            </Send>
                        </InputArticle>
                    </InputSection>
                </KeyboardView>
            </Container>
        </SafeView>
    );
};

export default ChatRoomScreen;

import React from 'react';
import { Text, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChatRoomScreen = () => {
    return (
        <SafeAreaView>
            <View>
                {/* Modal : '진료/진단 물어보기', '의료 질의응답 하기' 중 선택*/}
                <Text>AI 챗봇에게 건강상태를 체크해보세요!</Text>
                {/* <ScrollView /> 채팅 */}

                <Text>사용자 입력 창</Text>
                {/* 입력 칸 */}
            </View>
        </SafeAreaView>
        );
};

export default ChatRoomScreen;

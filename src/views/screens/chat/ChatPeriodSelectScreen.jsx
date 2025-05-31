import React from 'react';
import { Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChatPeriodSelectScreen = () => {
    return (
        <SafeAreaView>
            <Text>이전 기록들을 확인해보세요!</Text>

            <Text>방금 한 검사를 확인해보세요!</Text>
            {/* 검사 Image..? */}

            <Text>이전 기록을 모아놨어요!</Text>
            {/* flexDirection: row -> 7일 이내, 한달 이내, 3개울 이내 */}

            <Text>달력으로도 확인해보세요!</Text>
            {/* 달력 */}

        </SafeAreaView>
    );
};

export default ChatPeriodSelectScreen;

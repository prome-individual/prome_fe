import { React } from 'react';
import { View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MainScreen = () => {

    return (
        <SafeAreaView>
            {/* Description Image */}

            <Text>심전도 검사를 실행해보세요!</Text>
            {/* Diag Image */}

            <Text>AI 챗봇에게 질문해보세요!</Text>
            {/* flexDirection: row */}
            {/* left : Chat 가기 Image, right : Live Image */}

            <Text>이전 기록들을 확인해보세요!</Text>
            {/* Period 선택 Image */}

        </SafeAreaView>
    );


};
export default MainScreen;

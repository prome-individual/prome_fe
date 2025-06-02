import { React } from 'react';
import { Alert, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MainScreen = ({ navigation }) => {

    return (
        <SafeAreaView>
            {/* Description Image */}

            <Text>심전도 검사를 실행해보세요!</Text>
            <Button title="진단하기 페이지 이동" onPress={() => {
                Alert.alert('버튼 누름!');
                navigation.navigate('Diag'); }}/>
            {/* Diag Image */}

            <Text>AI 챗봇에게 질문해보세요!</Text>
            <Button title="챗룸 페이지 이동" onPress={() => {
                Alert.alert('버튼 누름!');
                navigation.navigate('Chat'); }}/>

            {/* flexDirection: row */}
            {/* left : Chat 가기 Image, right : Live Image */}

            <Text>이전 기록들을 확인해보세요!</Text>
            <Button title="이전 기록 확인 페이지 이동" onPress={() => {
                Alert.alert('버튼 누름!');
                navigation.navigate('ChatPeriod'); }}/>
            {/* Period 선택 Image */}

            <Text>로그인창 가기</Text>
            <Button title="로그인창" onPress={() => {
                Alert.alert('버튼 누름!');
                navigation.navigate('Login'); }}
            />


        </SafeAreaView>
    );


};
export default MainScreen;

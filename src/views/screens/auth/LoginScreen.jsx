import { React } from 'react';
import { Alert, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = ({ navigation }) => {
    return (
        <SafeAreaView>
            <Text>ID</Text>
            {/* id 입력 */}

            <Text>PASSWORD</Text>
            {/* password 입력 */}

            <Button title="메인 가기" onPress={() => {
                navigation.navigate('Main'); }}
            />
            <Text>Sign in</Text>
            <Button title="회원가입창" onPress={() => {
                navigation.navigate('Register'); }}
            />
            <Button title="채팅페이지" onPress={() => {
                navigation.navigate('Chat');
            }}
            />
            <Button title="이전기록" onPress={() => {
                navigation.navigate('ChatPeriod');
            }}
            />
        </SafeAreaView>

    );
};

export default LoginScreen;

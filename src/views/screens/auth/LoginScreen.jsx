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
                Alert.alert('버튼 누름!');
                navigation.navigate('Main'); }}
            />
            <Text>Sign in</Text>
            <Button title="회원가입창" onPress={() => {
                Alert.alert('버튼 누름!');
                navigation.navigate('Register'); }}
            />
        </SafeAreaView>

    );
};

export default LoginScreen;

import { React } from 'react';
import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RegisterScreen = () => {
    return (
        <SafeAreaView>
            <Text>register</Text>
            {/* id, name, gender, phone 입력 */}

            <Button>회원가입</Button>
        </SafeAreaView>
    );
};

export default RegisterScreen;

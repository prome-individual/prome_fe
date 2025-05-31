import { React } from 'react';
import { View, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = () => {
    return (
        <SafeAreaView>
            <Text>login</Text>
            {/* id, password 입력 */}
            <Button>press</Button>
        </SafeAreaView>

    );
};

export default LoginScreen;

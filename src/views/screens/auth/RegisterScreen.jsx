import { React } from 'react';
import { Button, Text, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RegisterScreen = ({ navigation }) => {
    return (
        <SafeAreaView>
            <ScrollView>
                <Text>ID</Text>
                {/* id 입력 */}

                <Text>PASSWORD</Text>
                {/* password 입력 */}

                <Text>NAME</Text>
                {/* name 입력 */}

                <Text>GENDER</Text>
                {/* gender 입력 */}

                <Text>PHONE</Text>
                {/* phone 입력 */}
            </ScrollView>


            <Button title="완료" onPress={() => {
                Alert.alert('버튼 누름!');
                navigation.navigate('Login');
            }}/>
        </SafeAreaView>
    );
};

export default RegisterScreen;

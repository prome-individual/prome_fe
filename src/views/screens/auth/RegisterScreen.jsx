import React, { useState } from 'react';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import Back from '../../common/Back';

const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: white;
`;

const ScrollContainer = styled.ScrollView`
    flex: 1;
    padding: 20px;
`;

const Title = styled.Text`
    text-align: center;
    font-size: 28px;
    font-weight: 600;
`;

const InputContainer = styled.View`
    margin-bottom: 20px;
`;

const Label = styled.Text`
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
`;

const Input = styled.TextInput`
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 12px 16px;
    font-size: 16px;
    background-color: white;
    color: #333;
`;

const GenderContainer = styled.View`
    flex-direction: row;
    gap: 10px;
`;

const GenderButton = styled.TouchableOpacity`
    flex: 1;
    padding: 12px;
    border: 1px solid ${props => props.selected ? '#BF4F74' : '#ddd'};
    background-color: ${props => props.selected ? '#BF4F74' : 'white'};
    border-radius: 8px;
    align-items: center;
`;

const GenderText = styled.Text`
    font-size: 16px;
    color: ${props => props.selected ? 'white' : '#333'};
    font-weight: ${props => props.selected ? '600' : '400'};
`;

const Button = styled.TouchableOpacity`
    background-color: #BF4F74;
    padding: 16px 32px;
    border-radius: 8px;
    margin: 20px;
    align-items: center;
    justify-content: center;
`;

const ButtonText = styled.Text`
    color: white;
    font-size: 16px;
    font-weight: 600;
`;

const RegisterScreen = ({ navigation }) => {
    const [selectedGender, setSelectedGender] = useState('');

    return (
        <Container>
            <Back navigation={navigation} />
            <ScrollContainer>
                <Title>회원가입</Title>
                <InputContainer>
                    <Label>ID</Label>
                    <Input
                        placeholder="아이디를 입력하세요"
                        autoCapitalize="none"
                    />
                </InputContainer>

                <InputContainer>
                    <Label>PASSWORD</Label>
                    <Input
                        placeholder="비밀번호를 입력하세요"
                        secureTextEntry={true}
                    />
                </InputContainer>

                <InputContainer>
                    <Label>NAME</Label>
                    <Input
                        placeholder="이름을 입력하세요"
                    />
                </InputContainer>

                <InputContainer>
                    <Label>GENDER</Label>
                    <GenderContainer>
                        <GenderButton
                            selected={selectedGender === '남자'}
                            onPress={() => setSelectedGender('남자')}
                        >
                            <GenderText selected={selectedGender === '남자'}>
                                남자
                            </GenderText>
                        </GenderButton>
                        <GenderButton
                            selected={selectedGender === '여자'}
                            onPress={() => setSelectedGender('여자')}
                        >
                            <GenderText selected={selectedGender === '여자'}>
                                여자
                            </GenderText>
                        </GenderButton>
                    </GenderContainer>
                </InputContainer>

                <InputContainer>
                    <Label>PHONE</Label>
                    <Input
                        placeholder="전화번호를 입력하세요"
                        keyboardType="phone-pad"
                    />
                </InputContainer>
            </ScrollContainer>

            <Button onPress={() => {
                Alert.alert('버튼 누름!', `선택된 성별 : ${selectedGender}`);
                navigation.navigate('Login');
            }}>
                <ButtonText>완료</ButtonText>
            </Button>
            <Button onPress={() => {
                navigation.navigate('OK');
            }}>
                <ButtonText>다음</ButtonText>
            </Button>
        </Container>
    );
};

export default RegisterScreen;

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../views/screens/auth/LoginScreen';
import RegisterScreen from '../views/screens/auth/RegisterScreen';

import ChatRoomScreen from '../views/screens/chat/ChatRoomScreen';
import ChatPeriodSelectScreen from '../views/screens/chat/ChatPeriodSelectScreen';

import DiagScreen from '../views/screens/diag/DiagScreen';

import DescriptionScreen from '../views/screens/etc/DescriptionScreen';
import MainScreen from '../views/screens/etc/MainScreen';

import CalendarScreen from '../views/screens/calendar/CalendarScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login"
                component={LoginScreen}
                options={{ headerShown: true, animation: 'none'}}
            />
            <Stack.Screen name="Register"
                component={RegisterScreen}
                options={{ headerShown: true, animation: 'none'}}
            />
            <Stack.Screen name="Chat"
                component={ChatRoomScreen}
                options={{ headerShown: true, animation: 'none'}}
            />
            <Stack.Screen name="ChatPeriod"
                component={ChatPeriodSelectScreen}
                options={{ headerShown: true, animation: 'none'}}
            />
            <Stack.Screen name="Diag"
                component={DiagScreen}
                options={{ headerShown: true, animation: 'none'}}
            />
            <Stack.Screen name="Description"
                component={DescriptionScreen}
                options={{ headerShown: true, animation: 'none'}}
            />
            <Stack.Screen name="Main"
                component={MainScreen}
                options={{ headerShown: true, animation: 'none'}}
            />
            <Stack.Screen name="Calendar"
            component={CalendarScreen}
            options={{ headerShown: true, animation: 'none'}}
            />
        </Stack.Navigator>

        // navigation.pop() 발생 시 => 자동으로 반대로 됨
    );
};

export default StackNavigator;

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../views/screens/auth/LoginScreen';
import RegisterScreen from '../views/screens/auth/RegisterScreen';
import NextScreen from '../views/screens/auth/NextScreen';

import ChatRoomScreen from '../views/screens/chat/ChatRoomScreen';
import ChatPeriodSelectScreen from '../views/screens/chat/ChatPeriodSelectScreen';
import ChatMostScreen from '../views/screens/chat/ChatMostScreen';
import ChatRoomHistoryScreen from '../views/screens/chat/ChatRoomHistoryScreen';

import DiagScreen from '../views/screens/diag/DiagScreen';
import DiagResultHistoryScreen from '../views/screens/diag/DiagResultHistoryScreen';

import MainScreen from '../views/screens/etc/MainScreen';
import MapScreen from '../views/screens/etc/MapScreen';

import { RootStackParamList } from '@/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator: React.FC = () => {
    return (
        <Stack.Navigator initialRouteName="Next">
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false, animation: 'none' }}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ headerShown: false, animation: 'none' }}
            />
            <Stack.Screen
                name="Chat"
                component={ChatRoomScreen}
                options={{ headerShown: false, animation: 'none' }}
            />
            <Stack.Screen
                name="ChatPeriod"
                component={ChatPeriodSelectScreen}
                options={{ headerShown: false, animation: 'none' }}
            />
            <Stack.Screen
                name="ChatMost"
                component={ChatMostScreen}
                options={{ headerShown: false, animation: 'none' }}
            />
            <Stack.Screen
                name="ChatHistory"
                component={ChatRoomHistoryScreen}
                options={{ headerShown: false, animation: 'none' }}
            />
            <Stack.Screen
                name="Diag"
                component={DiagScreen}
                options={{ headerShown: false, animation: 'none' }}
            />
            <Stack.Screen
                name="DiagResult"
                component={DiagResultHistoryScreen}
                options={{ headerShown: false, animation: 'none' }}
            />
            <Stack.Screen
                name="Main"
                component={MainScreen}
                options={{ headerShown: false, animation: 'none' }}
            />
            <Stack.Screen
                name="Map"
                component={MapScreen}
                options={{ headerShown: false, animation: 'none' }}
            />
            <Stack.Screen
                name="Next"
                component={NextScreen}
                options={{ headerShown: false, animation: 'none' }}
            />
        </Stack.Navigator>
    );
};

export default StackNavigator;

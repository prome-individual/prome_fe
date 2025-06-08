import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CalendarScreen = () => {
    return (
        <SafeAreaView>
            <View>
                <Text>예약 일정 캘린더들</Text>
            </View>
        </SafeAreaView>
    );
};

export default CalendarScreen;

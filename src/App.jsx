import React from 'react';

import { SafeAreaProvider  } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';
import { StatusBar } from 'react-native';

const App = () => {
  return (
    <SafeAreaProvider>
        <StatusBar
          backgroundColor="red"
          barStyle="light-content"
        />
        <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;


import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';
import { StatusBar, Animated } from 'react-native';
import Colors from './views/styles/Colors';
import StartScreen from './views/screens/auth/StartScreen';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(1));

  const handleSplashFinish = () => {
    // 부드러운 페이드아웃 애니메이션
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowSplash(false);
    });
  };

  if (showSplash) {
    return (
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <StartScreen onFinish={handleSplashFinish} />
      </Animated.View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar
        backgroundColor={Colors.background.bg}
        barStyle="dark-content"
      />
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
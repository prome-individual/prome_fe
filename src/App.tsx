import React, { useState, createContext, useContext } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';
import { StatusBar, Animated } from 'react-native';
import Colors from './views/styles/Colors';
import StartScreen from './views/screens/auth/StartScreen';

interface AppStateContextType {
  isAppReady: boolean;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const useAppState = (): AppStateContextType => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within AppStateContext.Provider');
  }
  return context;
};

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [isAppReady, setIsAppReady] = useState<boolean>(false);
  const [fadeAnim] = useState<Animated.Value>(new Animated.Value(1));
  const [mainFadeAnim] = useState<Animated.Value>(new Animated.Value(0));

  const handleSplashFinish = (): void => {
    Animated.timing(mainFadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowSplash(false);
      setTimeout(() => {
        setIsAppReady(true);
      }, 100);
    });
  };

  return (
    <AppStateContext.Provider value={{ isAppReady }}>
      <SafeAreaProvider>
        <StatusBar
          backgroundColor={Colors.background.bg}
          barStyle="dark-content"
        />

        <Animated.View
          style={{
            flex: 1,
            opacity: showSplash ? mainFadeAnim : 1,
            backgroundColor: Colors.background.bg,
          }}
        >
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </Animated.View>

        {showSplash && (
          <Animated.View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: fadeAnim,
              backgroundColor: Colors.background.bg,
            }}
          >
            <StartScreen onFinish={handleSplashFinish} />
          </Animated.View>
        )}
      </SafeAreaProvider>
    </AppStateContext.Provider>
  );
};

export default App;

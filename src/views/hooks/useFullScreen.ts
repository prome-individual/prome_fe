import { useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';

interface UseFullScreenReturn {
  enableFullScreen: () => void;
  disableFullScreen: () => void;
}

const useFullScreen = (): UseFullScreenReturn => {
  useEffect(() => {
    console.log('useFullScreen: Platform.OS =', Platform.OS);

    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent', true);
      StatusBar.setTranslucent(true);
      StatusBar.setBarStyle('dark-content');

      console.log('useFullScreen: Android StatusBar setup complete');
    }
  }, []);

  const enableFullScreen = (): void => {
    console.log('useFullScreen: enableFullScreen called');

    if (Platform.OS === 'android') {
        console.log('useFullScreen: Enabling fullscreen for Android');
      StatusBar.setHidden(false);
    }
  };

  const disableFullScreen = (): void => {
    console.log('useFullScreen: disableFullScreen called');

    if (Platform.OS === 'android') {
      StatusBar.setHidden(false);
    }
  };

  return {
    enableFullScreen,
    disableFullScreen,
  };
};

export default useFullScreen;

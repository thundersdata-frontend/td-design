import React, { useEffect } from 'react';
import { ThemeProvider } from '@td-design/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { useAtomValue } from 'jotai/utils';

import { MainStack } from './stacks/mainStack';
import { darkTheme, lightTheme } from './theme';
import { themeAtom } from './atom';
import { init } from 'react-native-amap-search';

/**启动时注册自定义图标 */
const App = () => {
  const theme = useAtomValue(themeAtom);

  useEffect(() => {
    init();
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;

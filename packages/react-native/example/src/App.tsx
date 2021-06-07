import React, { useState } from 'react';
import { ThemeProvider, helpers } from '@td-design/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { useAtomValue } from 'jotai/utils';

import Iconfont from './Iconfont';
import { MainStack } from './stacks/mainStack';
import { darkTheme, lightTheme } from './theme';
import { themeAtom } from './atom';

/**启动时注册自定义图标 */
helpers.registerCustomIcon(Iconfont);
const App = () => {
  const theme = useAtomValue(themeAtom);

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

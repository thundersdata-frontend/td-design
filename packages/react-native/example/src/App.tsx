import React, { useState } from 'react';
import { ThemeProvider, helpers } from '@td-design/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import { theme, darkTheme } from './theme';
import Iconfont from './Iconfont';
import { MainStack } from './stacks/mainStack';

/**启动时注册自定义图标 */
helpers.registerCustomIcon(Iconfont);
const App = () => {
  const [dark] = useState(false);

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={dark ? darkTheme : theme}>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;

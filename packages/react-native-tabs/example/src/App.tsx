import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TabsDemo } from './screens/TabsDemo';

/**启动时注册自定义图标 */
const App = () => {
  return (
    <SafeAreaProvider>
      <TabsDemo />
    </SafeAreaProvider>
  );
};

export default App;

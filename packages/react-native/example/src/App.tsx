import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { ThemeProvider, helpers } from '@td-design/react-native';
import { theme } from './theme';
import Iconfont from './Iconfont';
import ModalPickerDemo from './ModalPickerDemo';
import ModalDatePickerDemo from './ModalDatePickerDemo';
import InputDemo from './InputDemo';
import { SafeAreaProvider } from 'react-native-safe-area-context';

/**启动时注册自定义图标 */
helpers.registerCustomIcon(Iconfont);
const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider {...{ theme }}>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* <ModalPickerDemo /> */}
            {/* <ModalDatePickerDemo /> */}
            <InputDemo />
          </ScrollView>
        </SafeAreaView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;

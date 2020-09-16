import React from 'react';
import { ScrollView } from 'react-native';
import { ThemeProvider, helpers } from '@td-design/react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { theme } from './theme';
import Iconfont from './Iconfont';
import ModalPickerDemo from './ModalPickerDemo';
import ModalDatePickerDemo from './ModalDatePickerDemo';
import ActionSheetDemo from './ActionSheetDemo';

/**启动时注册自定义图标 */
helpers.registerCustomIcon(Iconfont);
const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider {...{ theme }}>
        <SafeAreaView>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* <ModalPickerDemo /> */}
            <ModalDatePickerDemo />
            {/* <ActionSheetDemo /> */}
          </ScrollView>
        </SafeAreaView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;

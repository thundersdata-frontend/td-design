import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { ThemeProvider, helpers } from '@td-design/react-native';
import { theme } from './theme';
import Iconfont from './Iconfont';
import ModalPickerDemo from './ModalPickerDemo';
import ModalDatePickerDemo from './ModalDatePickerDemo';
import SwitchDemo from './SwitchDemo';

/**启动时注册自定义图标 */
helpers.registerCustomIcon(Iconfont);
const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ThemeProvider {...{ theme }}>
          {/* <ModalPickerDemo /> */}
          {/* <ModalDatePickerDemo /> */}
          <SwitchDemo></SwitchDemo>
        </ThemeProvider>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

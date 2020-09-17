import React from 'react';
import { ScrollView } from 'react-native';
import { ThemeProvider, helpers } from '@td-design/react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { theme, darkTheme } from './theme';
import Iconfont from './Iconfont';
import ModalPickerDemo from './ModalPickerDemo';
import ModalDatePickerDemo from './ModalDatePickerDemo';
import ActionSheetDemo from './ActionSheetDemo';
import CardDemo from './CardDemo';

/**启动时注册自定义图标 */
helpers.registerCustomIcon(Iconfont);
const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider {...{ theme }}>
        <SafeAreaView style={{ flex: 1, backgroundColor: 'grey' }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* <ModalPickerDemo /> */}
            {/* <ModalDatePickerDemo /> */}
            {/* <ActionSheetDemo /> */}
            <CardDemo />
          </ScrollView>
        </SafeAreaView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;

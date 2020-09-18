import React from 'react';
import { ScrollView } from 'react-native';
import { ThemeProvider, helpers } from '@td-design/react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { theme, darkTheme } from './theme';
import Iconfont from './Iconfont';
import ModalPickerDemo from './ModalPickerDemo';
import ModalDatePickerDemo from './ModalDatePickerDemo';
import ActionSheetDemo from './ActionSheetDemo';
import BadgeDemo from './BageDemo';
import AccordionDemo from './AccordionDemo';
import ModalDemo from './ModalDemo';
import IconDemo from './IconDemo';

/**启动时注册自定义图标 */
helpers.registerCustomIcon(Iconfont);
const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider {...{ darkTheme }}>
        <SafeAreaView>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* <ModalPickerDemo /> */}
            {/* <ModalDatePickerDemo /> */}
            {/* <ActionSheetDemo /> */}
            {/* <BadgeDemo /> */}
            {/* <AccordionDemo /> */}
            {/* <ModalDemo /> */}
            <IconDemo />
          </ScrollView>
        </SafeAreaView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;

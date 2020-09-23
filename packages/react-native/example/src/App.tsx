import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { ThemeProvider, helpers } from '@td-design/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { theme } from './theme';
import Iconfont from './Iconfont';
import ModalPickerDemo from './ModalPickerDemo';
import ModalDatePickerDemo from './ModalDatePickerDemo';
import ActionSheetDemo from './ActionSheetDemo';
import BadgeDemo from './BageDemo';
import AccordionDemo from './AccordionDemo';
import ModalDemo from './ModalDemo';
import IconDemo from './IconDemo';
import DividerDemo from './DividerDemo';
import TagDemo from './TagDemo';
import ModalAlertDemo from './ModalAlertDemo';

/**启动时注册自定义图标 */
helpers.registerCustomIcon(Iconfont);
const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider {...{ theme }}>
        <SafeAreaView>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* <ModalPickerDemo /> */}
            {/* <ActionSheetDemo /> */}
            {/* <ModalDatePickerDemo /> */}
            {/* <BadgeDemo /> */}
            {/* <AccordionDemo /> */}
            <ModalDemo />
            {/* <IconDemo /> */}
            {/* <DividerDemo /> */}
            {/* <ImagePickerDemo /> */}
            {/* <TagDemo /> */}
            {/* <ModalAlertDemo /> */}
          </ScrollView>
        </SafeAreaView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;

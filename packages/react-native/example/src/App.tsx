import React from 'react';
import { ScrollView, View } from 'react-native';
import { ThemeProvider, helpers, Text } from '@td-design/react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Badge from '../../components/badge';
import { theme } from './theme';
import Iconfont from './Iconfont';
import ModalPickerDemo from './ModalPickerDemo';
import ModalDatePickerDemo from './ModalDatePickerDemo';
import ActionSheetDemo from './ActionSheetDemo';
import BadgeDemo from './BageDemo';
import AccordionDemo from './AccordionDemo';
import ModalDemo from './ModalDemo';
import IconDemo from './IconDemo';
import ImagePickerDemo from './ImagePickerDemo';

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
            {/* <BadgeDemo /> */}
            {/* <AccordionDemo /> */}
            {/* <ModalDemo /> */}
            {/* <IconDemo /> */}
            {/* <ImagePickerDemo /> */}
          </ScrollView>
        </SafeAreaView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;

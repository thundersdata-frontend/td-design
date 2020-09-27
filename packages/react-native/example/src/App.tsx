import React, { useState } from 'react';
import { KeyboardAvoidingView, SafeAreaView, ScrollView } from 'react-native';
import { ThemeProvider, helpers } from '@td-design/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { theme, darkTheme } from './theme';
import Iconfont from './Iconfont';
// import ModalPickerDemo from './ModalPickerDemo';
// import ModalDatePickerDemo from './ModalDatePickerDemo';
// import ActionSheetDemo from './ActionSheetDemo';
// import ActionSheetDemo from './ActionSheetDemo';
// import BadgeDemo from './BageDemo';
// import AccordionDemo from './AccordionDemo';
// import ModalDemo from './ModalDemo';
// import IconDemo from './IconDemo';
// import ImagePickerDemo from './ImagePickerDemo';
// import TagDemo from './TagDemo';
import ListItemDemo from './ListItemDemo';

/**启动时注册自定义图标 */
helpers.registerCustomIcon(Iconfont);
const App = () => {
  const [dark] = useState(false);

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={dark ? darkTheme : theme}>
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView enabled behavior="padding" style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" style={{ flex: 1 }}>
              {/* <ModalPickerDemo /> */}
              {/* <ActionSheetDemo /> */}
              {/* <ModalDatePickerDemo /> */}
              {/* <BadgeDemo /> */}
              {/* <AccordionDemo /> */}
              {/* <ModalDemo /> */}
              {/* <IconDemo /> */}
              {/* <DividerDemo /> */}
              {/* <ImagePickerDemo /> */}
              {/* <TagDemo /> */}
              {/* <InputDemo /> */}
              {/* <CardDemo /> */}
              {/* <ProgressDemo /> */}
              {/* <StepperDemo /> */}
              {/* <DarkThemeDemo checked={dark} onChange={setDark} />
              <EmptyDemo /> */}
              <ListItemDemo />
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;

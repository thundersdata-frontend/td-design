import React, { useState } from 'react';
import { KeyboardAvoidingView, SafeAreaView, ScrollView } from 'react-native';
import { ThemeProvider, helpers } from '@td-design/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { theme, darkTheme } from './theme';
import Iconfont from './Iconfont';
import ModalPickerDemo from './ModalPickerDemo';
import ModalDatePickerDemo from './ModalDatePickerDemo';
import SwitchDemo from './SwitchDemo';
import InputDemo from './InputDemo';
import ActionSheetDemo from './ActionSheetDemo';
import CardDemo from './CardDemo';
import BadgeDemo from './BadgeDemo';
import AccordionDemo from './AccordionDemo';
import ModalDemo from './ModalDemo';
import IconDemo from './IconDemo';
import DividerDemo from './DividerDemo';
import ImagePickerDemo from './ImagePickerDemo';
import TagDemo from './TagDemo';
import ModalAlertDemo from './ModalAlertDemo';
import ProgressDemo from './ProgressDemo';
import ModalPromptDemo from './ModalPromptDemo';
import ModalTipDemo from './ModalTipDemo';
import StepperDemo from './StepperDemo';
import DarkThemeDemo from './DarkThemeDemo';
import ButtonDemo from './ButtonDemo';
import NoticeBarDemo from './NoticeBarDemo';
import EmptyDemo from './EmptyDemo';
import ShareDemo from './ShareDemo';
import ToastDemo from './ToastDemo';

/**启动时注册自定义图标 */
helpers.registerCustomIcon(Iconfont);
const App = () => {
  const [dark, setDark] = useState(false);

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
              {/* <ModalPromptDemo /> */}
              {/* <ModalAlertDemo /> */}
              {/* <ModalTipDemo /> */}
              {/* <StepperDemo /> */}
              {/* <ButtonDemo /> */}
              {/* <DarkThemeDemo checked={dark} onChange={setDark} /> */}
              {/* <NoticeBarDemo /> */}
              {/* <EmptyDemo /> */}
              {/* <ShareDemo /> */}
              {/* <SwitchDemo /> */}
              <ToastDemo />
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;

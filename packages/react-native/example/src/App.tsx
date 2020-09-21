import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { ThemeProvider, Icon, Flex, WhiteSpace, helpers } from '@td-design/react-native';
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
import TagDemo from './TagDemo';
import ActionSheetDemo from './ActionSheetDemo';
import EmptyDemo from './EmptyDemo';
import ImagePickerDemo from './ImagePickerDemo';

/**启动时注册自定义图标 */
helpers.registerCustomIcon(Iconfont);
const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider {...{ darkTheme }}>
        {/* <Icon name="user" color="#ff00ff" />
        <Icon name="user" color="#ff00ff" disabled />
        <Icon name="user" color="#ff00ff" rounded />
        <Icon name="user" color="#00aaff" rounded disabled />
        <Icon name="user" color="#ff00ff" size={32} rounded />
        <Icon name="user" color="#ff00ff" rounded shadow />
        <Icon
          name="user"
          color="blue"
          rounded
          onPress={() => {
            console.log(123);
          }}
        />
        <Flex>
          <Icon name="user" color="blue" rounded onPress={() => {}} disabled />
          <Icon rounded name="heartbeat" type="font-awesome" color="#f50" onPress={() => console.log('hello')} />
        </Flex>
        <WhiteSpace />
        <Flex>
          <Flex.Item>
            <Icon name="user" color="blue" rounded onPress={() => {}} disabled />
          </Flex.Item>
          <Flex.Item>
            <Icon rounded name="heartbeat" type="font-awesome" color="#f50" onPress={() => console.log('hello')} />
          </Flex.Item>
        </Flex>
        <WhiteSpace />
 
        <Icon name="icon_shaixuan" color="#f50" size={30} type="custom" />
        <Icon name="icon_shaixuan" color="#f50" size={24} type="custom" rounded /> */}
        <SafeAreaView>
          <ScrollView showsVerticalScrollIndicator={false}>
            <EmptyDemo />
            {/* <ModalPickerDemo /> */}
            {/* <ActionSheetDemo /> */}
            {/* <ModalDatePickerDemo /> */}
            {/* <BadgeDemo /> */}
            {/* <AccordionDemo /> */}
            {/* <ModalDemo /> */}
            {/* <IconDemo /> */}
            <ImagePickerDemo />
            <TagDemo />
          </ScrollView>
        </SafeAreaView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;

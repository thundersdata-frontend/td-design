import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { ThemeProvider, Icon, Flex, WhiteSpace, helpers, Tag } from '@td-design/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { theme } from './theme';
import Iconfont from './Iconfont';
// import ModalPickerDemo from './ModalPickerDemo';
import ModalDatePickerDemo from './ModalDatePickerDemo';
// import ActionSheetDemo from './ActionSheetDemo';

/**启动时注册自定义图标 */
helpers.registerCustomIcon(Iconfont);
const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider {...{ theme }}>
        <Icon name="user" color="#ff00ff" />
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
        {/* 使用自定义图标 */}
        <Icon name="icon_shaixuan" color="#f50" size={30} type="custom" />
        <Icon name="icon_shaixuan" color="#f50" size={24} type="custom" rounded />

        <WhiteSpace />
        <Tag checked type="primary" disabled>
          magenta
        </Tag>
        <WhiteSpace />
        <Tag color="red" checked size="small" type="primary" disabled>
          magenta
        </Tag>
        <WhiteSpace />
        <Tag closable>magenta</Tag>
        <WhiteSpace />
        <Tag size="large" closable>
          magenta
        </Tag>
        <WhiteSpace />
        <Tag color="red" size="small" closable>
          magenta
        </Tag>
        <WhiteSpace />
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

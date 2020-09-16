import React from 'react';
import { SafeAreaView } from 'react-native';
import { ThemeProvider, Icon, Flex, WhiteSpace, helpers, Tag } from '@td-design/react-native';
import { theme } from './theme';
import Iconfont from './Iconfont';

/**启动时注册自定义图标 */
helpers.registerCustomIcon(Iconfont);
const App = () => {
  return (
    <SafeAreaView>
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
        <Tag closable onClose={() => {}}>
          Movies
        </Tag>
        <WhiteSpace />
        <Tag disabled>disabled</Tag>
        <WhiteSpace />
        <Tag checked closable onChange={() => {}}>
          checked
        </Tag>
        <WhiteSpace />
        <Tag color="magenta">magenta</Tag>
      </ThemeProvider>
    </SafeAreaView>
  );
};

export default App;

import React from 'react';
import { SafeAreaView } from 'react-native';
import { ThemeProvider, Icon, Flex, WhiteSpace, helpers, Badge, Box } from '@td-design/react-native';
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
        <Badge text={8} backgroundColor="primaryTextColor" width={32}>
          <Box backgroundColor="mainForeground" width={32} height={32} />
        </Badge>
        <WhiteSpace />
        <Badge text={19} width={52}>
          <Box backgroundColor="mainForeground" width={52} height={52} />
        </Badge>
        <WhiteSpace />
        <Badge text="折扣券啊" width={102}>
          <Box backgroundColor="mainForeground" width={102} height={102} />
        </Badge>
        <WhiteSpace />
        <Badge text={9} dot width={82}>
          <Box backgroundColor="mainForeground" width={82} height={82} />
        </Badge>
        <WhiteSpace />
        <Badge text={9} width={62}>
          <Box backgroundColor="mainForeground" width={72} height={72} />
        </Badge>
      </ThemeProvider>
    </SafeAreaView>
  );
};

export default App;

import React from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import { ThemeProvider, Icon, Flex, WhiteSpace, helpers, Badge, Box } from '@td-design/react-native';
import { theme } from './theme';
import Iconfont from './Iconfont';

/**启动时注册自定义图标 */
helpers.registerCustomIcon(Iconfont);
const App = () => {
  return (
    <SafeAreaView>
      <ThemeProvider {...{ theme }}>
        <ScrollView>
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
          <Badge text={'折'} backgroundColor="primaryTextColor">
            <Box backgroundColor="mainForeground" width={52} height={52} />
          </Badge>
          <WhiteSpace />
          <Badge text={10900} overflowCount={14000}>
            <Box backgroundColor="mainForeground" width={302} height={132} />
          </Badge>
          <WhiteSpace />
          <Badge text={9}>
            <Box backgroundColor="mainForeground" width={302} height={24} />
          </Badge>
          <WhiteSpace />
          <Badge text={9} dot>
            <Box backgroundColor="mainForeground" width={82} height={82} />
          </Badge>
          <WhiteSpace />
          <Badge text={9}>
            <Text>aaaa</Text>
          </Badge>
        </ScrollView>
      </ThemeProvider>
    </SafeAreaView>
  );
};

export default App;

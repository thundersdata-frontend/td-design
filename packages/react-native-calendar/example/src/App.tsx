import React, { useState } from 'react';
import { ThemeProvider, helpers, Box, Text, Badge } from '@td-design/react-native';
import { Agenda } from '@td-design/react-native-calendar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Switch, View } from 'react-native';

import { theme, darkTheme } from './theme';
import Iconfont from './Iconfont';

const { px } = helpers;

/**启动时注册自定义图标 */
helpers.registerCustomIcon(Iconfont);
const App = () => {
  const [dark, changeDark] = useState(false);

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={dark ? darkTheme : theme}>
        <NavigationContainer>
          <View style={{ backgroundColor: '#fff' }}>
            <Switch value={dark} onValueChange={changeDark} />
            <Box backgroundColor="backgroundColor1">
              <Text variant="primaryTitle">哈哈哈哈，我是内容</Text>
            </Box>

            <Badge text="折扣券" backgroundColor="primaryTextColor" type="ribbon">
              <Box backgroundColor="warningColor2" width={px(44)} height={px(44)} />
            </Badge>

            <Agenda
              data={[
                { time: '09:00', title: '上班打卡' },
                { time: '12:00', title: '吃午饭啦' },
              ]}
              keyExtractor={(_, index) => `${index}`}
              markedDates={{ '2020-12-03': { dotColor: theme.colors.success }, '2020-12-13': { dotColor: 'red' } }}
            />
          </View>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;

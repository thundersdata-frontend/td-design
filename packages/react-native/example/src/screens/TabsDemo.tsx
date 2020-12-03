import React from 'react';
import { Tabs, Icon } from '@td-design/react-native';
import { Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Container from '../components/Container';

const badgeService = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(99);
    }, 1000);
  });
};

function HomeScreen() {
  const navigation = useNavigation();
  const fetchBadge = async () => {
    const badge = await badgeService();
    navigation.setOptions({ badge });
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="fetch badge" onPress={fetchBadge} />
      <Button title="go to settings" onPress={() => navigation.navigate('Settings')} />
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="修改title" onPress={() => navigation.setOptions({ title: '自定义头' })} />
      <Text>Settings!</Text>
    </View>
  );
}

export default () => {
  return (
    <Container>
      <Tabs
        tabBarOptions={{
          /** 选中状态的颜色 */
          activeTintColor: 'green',
          /** 未选中状态的颜色 */
          inactiveTintColor: 'red',
          /** 图标的自定义样式 */
          iconStyle: {},
          /** 文本的自定义样式 */
          labelStyle: { color: '#000' },
          /** 徽标的自定义样式 */
          badgeStyle: { fontSize: 12 },
          /** 整个tab项主容器的自定义样式 */
          style: { borderWidth: 1, borderColor: 'red' },
          /** tab项父容器的自定义样式 */
          contentContainerStyle: { backgroundColor: 'grey' },
          /** 滚动指示器的自定义样式 */
          indicatorStyle: { backgroundColor: 'gold' },
          /** 滚动指示器的容器的自定义样式 */
          indicatorContainerStyle: { backgroundColor: 'green' },
          /** 单个tab项的自定义样式 */
          tabStyle: { backgroundColor: '#fff00f' },
        }}
      >
        <Tabs.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => {
              return <Icon name="home" color={color} size={20} />;
            },
            tabBarLabel: () => {
              return <Text>首页</Text>;
            },
          }}
        />
        <Tabs.Screen name="Settings" component={SettingsScreen} options={{ title: '设置' }} />
        <Tabs.Screen name="Settings2" component={SettingsScreen} />
      </Tabs>
    </Container>
  );
};

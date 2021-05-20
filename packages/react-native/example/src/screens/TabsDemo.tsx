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
    navigation.setOptions({
      badge,
    });
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
      <Tabs.Navigator
      // screenOptions={
      //   {
      //     // tabBarItemStyle: { width: 'auto' },
      //   }
      // }
      >
        <Tabs.Screen name="Home" component={HomeScreen} options={{ title: '首页' }} />
        <Tabs.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: '设置',
            tabBarShowIcon: true,
            tabBarIcon: ({ color }) => <Icon name="user" color={color} size={14} />,
          }}
        />
        <Tabs.Screen name="Settings2" component={SettingsScreen} options={{ title: '设置22222222' }} />
      </Tabs.Navigator>
    </Container>
  );
};

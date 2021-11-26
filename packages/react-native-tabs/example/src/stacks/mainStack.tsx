import React from 'react';
import { Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@td-design/react-native-tabs';

const Tab = createMaterialTopTabNavigator();

export const MainStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const HomeScreen = () => {
  return (
    <View>
      <Text>home</Text>
    </View>
  );
};
const SettingsScreen = () => {
  return (
    <View>
      <Text>setttings</Text>
    </View>
  );
};

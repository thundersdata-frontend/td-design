import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@shopify/restyle';
import { helpers, Theme } from '@td-design/react-native';

import Homepage from '../screens/Homepage';
import ImagePickerDemo from '../screens/ImagePickerDemo';
import ImagePickerFormDemo from '../screens/ImagePickerFormDemo';

const { px } = helpers;
const Stack = createStackNavigator();

export const MainStack = () => {
  const theme = useTheme<Theme>();

  return (
    <Stack.Navigator
      initialRouteName="Homepage"
      mode="card"
      // Stack下每个screen都会共享的配置
      screenOptions={{
        headerTitleStyle: {
          fontWeight: '500',
          color: theme.colors.primary200,
          fontSize: px(18),
        },
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTitleAlign: 'center',
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="Homepage" component={Homepage} options={{ headerTitle: 'Homepage' }} />
      <Stack.Screen name="ImagePickerDemo" component={ImagePickerDemo} options={{ headerTitle: 'ImagePickerDemo' }} />
      <Stack.Screen
        name="ImagePickerFormDemo"
        component={ImagePickerFormDemo}
        options={{ headerTitle: 'ImagePickerFormDemo' }}
      />
    </Stack.Navigator>
  );
};

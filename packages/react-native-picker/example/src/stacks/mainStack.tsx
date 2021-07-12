import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@shopify/restyle';
import { helpers, Theme } from '@td-design/react-native';

import Homepage from '../screens/Homepage';
import { NormalPickerDemo } from '../screens/NormalPickerDemo';
import { CascadePickerDemo } from '../screens/CascadePickerDemo';
import { PickerItemDemo } from '../screens/PickerItemDemo';
import { DatePickerModalDemo } from '../screens/DatePickerModalDemo';
import { DatePickerDemo } from '../screens/DatePickerDemo';

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
      <Stack.Screen
        name="NormalPickerDemo"
        component={NormalPickerDemo}
        options={{ headerTitle: 'NormalPickerDemo' }}
      />
      <Stack.Screen
        name="CascadePickerDemo"
        component={CascadePickerDemo}
        options={{ headerTitle: 'CascadePickerDemo' }}
      />
      <Stack.Screen name="PickerItemDemo" component={PickerItemDemo} options={{ headerTitle: 'PickerItemDemo' }} />
      <Stack.Screen
        name="DatePickerModalDemo"
        component={DatePickerModalDemo}
        options={{ headerTitle: 'DatePickerModalDemo' }}
      />
      <Stack.Screen name="DatePickerDemo" component={DatePickerDemo} options={{ headerTitle: 'DatePickerDemo' }} />
    </Stack.Navigator>
  );
};

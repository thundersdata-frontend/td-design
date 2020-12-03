import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Homepage from '../screens/Homepage';
import { commonStackOptions } from '../common';

import ModalPickerDemo from '../screens/ModalPickerDemo';
import ModalDatePickerDemo from '../screens/ModalDatePickerDemo';
import SwitchDemo from '../screens/SwitchDemo';
import InputDemo from '../screens/InputDemo';
import ActionSheetDemo from '../screens/ActionSheetDemo';
import CardDemo from '../screens/CardDemo';
import BadgeDemo from '../screens/BadgeDemo';
import AccordionDemo from '../screens/AccordionDemo';
import ModalDemo from '../screens/ModalDemo';
import IconDemo from '../screens/IconDemo';
import DividerDemo from '../screens/DividerDemo';
import ImagePickerDemo from '../screens/ImagePickerDemo';
import TagDemo from '../screens/TagDemo';
import ModalAlertDemo from '../screens/ModalAlertDemo';
import ProgressDemo from '../screens/ProgressDemo';
import ModalPromptDemo from '../screens/ModalPromptDemo';
import ModalTipDemo from '../screens/ModalTipDemo';
import StepperDemo from '../screens/StepperDemo';
import DarkThemeDemo from '../screens/DarkThemeDemo';
import ButtonDemo from '../screens/ButtonDemo';
import NoticeBarDemo from '../screens/NoticeBarDemo';
import EmptyDemo from '../screens/EmptyDemo';
import ShareDemo from '../screens/ShareDemo';
import RatingDemo from '../screens/RatingDemo';
import AvatarDemo from '../screens/AvatarDemo';
import ImageDemo from '../screens/ImageDemo';
import SliderDemo from '../screens/SliderDemo';
import TabsDemo from '../screens/TabsDemo';
import ListItemDemo from '../screens/ListItemDemo';
import SearchBarDemo from '../screens/SearchBarDemo';
import HeaderDemo from '../screens/HeaderDemo';
import CheckableDemo from '../screens/CheckableDemo';
import ToastDemo from '../screens/ToastDemo';

const Stack = createStackNavigator();

export const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Homepage"
      mode="card"
      headerMode="screen"
      // Stack下每个screen都会共享的配置
      screenOptions={commonStackOptions}
    >
      <Stack.Screen name="Homepage" component={Homepage} options={{ headerTitle: 'Homepage' }} />
      <Stack.Screen name="TabsDemo" component={TabsDemo} options={{ headerTitle: 'TabsDemo' }} />
      <Stack.Screen name="ModalPickerDemo" component={ModalPickerDemo} options={{ headerTitle: 'ModalPickerDemo' }} />
      <Stack.Screen name="ModalAlertDemo" component={ModalAlertDemo} options={{ headerTitle: 'ModalAlertDemo' }} />
      <Stack.Screen name="ProgressDemo" component={ProgressDemo} options={{ headerTitle: 'ProgressDemo' }} />
      <Stack.Screen name="ModalPromptDemo" component={ModalPromptDemo} options={{ headerTitle: 'ModalPromptDemo' }} />
      <Stack.Screen name="ModalTipDemo" component={ModalTipDemo} options={{ headerTitle: 'ModalTipDemo' }} />
      <Stack.Screen name="StepperDemo" component={StepperDemo} options={{ headerTitle: 'StepperDemo' }} />
      <Stack.Screen name="DarkThemeDemo" component={DarkThemeDemo} options={{ headerTitle: 'DarkThemeDemo' }} />
      <Stack.Screen name="ButtonDemo" component={ButtonDemo} options={{ headerTitle: 'ButtonDemo' }} />
      <Stack.Screen name="SwitchDemo" component={SwitchDemo} options={{ headerTitle: 'SwitchDemo' }} />
      <Stack.Screen name="InputDemo" component={InputDemo} options={{ headerTitle: 'InputDemo' }} />
      <Stack.Screen name="ActionSheetDemo" component={ActionSheetDemo} options={{ headerTitle: 'ActionSheetDemo' }} />
      <Stack.Screen name="CardDemo" component={CardDemo} options={{ headerTitle: 'CardDemo' }} />
      <Stack.Screen name="BadgeDemo" component={BadgeDemo} options={{ headerTitle: 'BadgeDemo' }} />
      <Stack.Screen name="AccordionDemo" component={AccordionDemo} options={{ headerTitle: 'AccordionDemo' }} />
      <Stack.Screen name="ModalDemo" component={ModalDemo} options={{ headerTitle: 'ModalDemo' }} />
      <Stack.Screen name="IconDemo" component={IconDemo} options={{ headerTitle: 'IconDemo' }} />
      <Stack.Screen name="DividerDemo" component={DividerDemo} options={{ headerTitle: 'DividerDemo' }} />
      <Stack.Screen name="ImagePickerDemo" component={ImagePickerDemo} options={{ headerTitle: 'ImagePickerDemo' }} />
      <Stack.Screen name="TagDemo" component={TagDemo} options={{ headerTitle: 'TagDemo' }} />
      <Stack.Screen
        name="ModalDatePickerDemo"
        component={ModalDatePickerDemo}
        options={{ headerTitle: 'ModalDatePickerDemo' }}
      />
      <Stack.Screen name="HeaderDemo" component={HeaderDemo} options={{ header: () => null }} />
      <Stack.Screen name="SearchBarDemo" component={SearchBarDemo} options={{ headerTitle: 'SearchBarDemo' }} />
      <Stack.Screen name="SliderDemo" component={SliderDemo} options={{ headerTitle: 'SliderDemo' }} />
      <Stack.Screen name="ImageDemo" component={ImageDemo} options={{ headerTitle: 'ImageDemo' }} />
      <Stack.Screen name="ListItemDemo" component={ListItemDemo} options={{ headerTitle: 'ListItemDemo' }} />
      <Stack.Screen name="AvatarDemo" component={AvatarDemo} options={{ headerTitle: 'AvatarDemo' }} />
      <Stack.Screen name="RatingDemo" component={RatingDemo} options={{ headerTitle: 'RatingDemo' }} />
      <Stack.Screen name="ShareDemo" component={ShareDemo} options={{ headerTitle: 'ShareDemo' }} />
      <Stack.Screen name="EmptyDemo" component={EmptyDemo} options={{ headerTitle: 'EmptyDemo' }} />
      <Stack.Screen name="NoticeBarDemo" component={NoticeBarDemo} options={{ headerTitle: 'NoticeBarDemo' }} />
      <Stack.Screen name="CheckableDemo" component={CheckableDemo} options={{ headerTitle: 'CheckableDemo' }} />
      <Stack.Screen name="ToastDemo" component={ToastDemo} options={{ headerTitle: 'ToastDemo' }} />
    </Stack.Navigator>
  );
};

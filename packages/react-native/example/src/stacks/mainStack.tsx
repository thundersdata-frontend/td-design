import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@shopify/restyle';
import { helpers, Theme } from '@td-design/react-native';

import Homepage from '../screens/Homepage';
import FormDemo from '../screens/FormDemo';
import AccordionDemo from '../screens/AccordionDemo';
import MenuDemo from '../screens/MenuDemo';
import CollapseTextDemo from '../screens/CollapseTextDemo';
import HeaderDemo from '../screens/HeaderDemo';
import NoticeBarDemo from '../screens/NoticeBarDemo';
import ProgressDemo from '../screens/ProgressDemo';
import SliderDemo from '../screens/SliderDemo';
import SwipeRowDemo from '../screens/SwipeRowDemo';
import SwitchDemo from '../screens/SwitchDemo';
import ToastDemo from '../screens/ToastDemo';
import InputDemo from '../screens/InputDemo';
import ActionSheetDemo from '../screens/ActionSheetDemo';
import CardDemo from '../screens/CardDemo';
import BadgeDemo from '../screens/BadgeDemo';
import ModalDemo from '../screens/ModalDemo';
import DividerDemo from '../screens/DividerDemo';
import TagDemo from '../screens/TagDemo';
import ModalAlertDemo from '../screens/ModalAlertDemo';
import ModalConfirmDemo from '../screens/ModalConfirmDemo';
import ModalPromptDemo from '../screens/ModalPromptDemo';
import ModalTipDemo from '../screens/ModalTipDemo';
import StepperDemo from '../screens/StepperDemo';
import DarkThemeDemo from '../screens/DarkThemeDemo';
import ButtonDemo from '../screens/ButtonDemo';
import EmptyDemo from '../screens/EmptyDemo';
import AvatarDemo from '../screens/AvatarDemo';
import ImageDemo from '../screens/ImageDemo';
import ListDemo from '../screens/ListDemo';
import ListItemDemo from '../screens/ListItemDemo';
import SearchBarDemo from '../screens/SearchBarDemo';
import SwiperDemo from '../screens/SwiperDemo';
import TableDemo from '../screens/TableDemo';
import FlowDemo from '../screens/FlowDemo';
import NumberKeyboardDemo from '../screens/NumberKeyboardDemo';
import WhiteSpaceDemo from '../screens/WhiteSpaceDemo';
import ButtonGroupDemo from '../screens/ButtonGroupDemo';
import WingBlankDemo from '../screens/WingBlankDemo';
import TextDemo from '../screens/TextDemo';
import PaginationDemo from '../screens/PaginationDemo';
import TimeLineDemo from '../screens/TimeLineDemo';
import TreeDemo from '../screens/TreeDemo';
import BoxShadowDemo from '../screens/BoxShadowDemo';
import CountDownDemo from '../screens/CountDownDemo';
import TooltipDemo from '../screens/TooltipDemo';
import IndicatorDemo from '../screens/IndicatorDemo';
import SvgIconDemo from '../screens/SvgIconDemo';
import CheckboxDemo from '../screens/CheckboxDemo';
import RadioDemo from '../screens/RadioDemo';
import FlexDemo from '../screens/FlexDemo';
import CenterDemo from '../screens/CenterDemo';
import PressableDemo from '../screens/PressableDemo';
import LinkDemo from '../screens/LinkDemo';
import PasscodeDemo from '../screens/PasscodeDemo';
import ScrollNumberDemo from '../screens/ScrollNumberDemo';
import PullToRefreshDemo from '../screens/PullToRefreshDemo';

const { px } = helpers;
const Stack = createStackNavigator();

export const MainStack = () => {
  const theme = useTheme<Theme>();

  return (
    <Stack.Navigator
      initialRouteName="Homepage"
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
      <Stack.Screen name="SvgIconDemo" component={SvgIconDemo} options={{ headerTitle: 'SvgIconDemo' }} />
      <Stack.Screen name="FormDemo" component={FormDemo} options={{ headerTitle: 'FormDemo' }} />
      <Stack.Screen name="AccordionDemo" component={AccordionDemo} options={{ headerTitle: 'AccordionDemo' }} />
      {/* <Stack.Screen name="CalendarDemo" component={CalendarDemo} options={{ headerTitle: 'CalendarDemo' }} />
      <Stack.Screen name="PasswordDemo" component={PasswordDemo} options={{ headerTitle: 'PasswordDemo' }} /> */}
      {/* <Stack.Screen name="RatingDemo" component={RatingDemo} options={{ headerTitle: 'RatingDemo' }} /> */}
      {/* <Stack.Screen name="TabsDemo" component={TabsDemo} options={{ headerTitle: 'TabsDemo' }} /> */}
      <Stack.Screen name="MenuDemo" component={MenuDemo} options={{ headerTitle: 'MenuDemo' }} />
      <Stack.Screen
        name="CollapseTextDemo"
        component={CollapseTextDemo}
        options={{ headerTitle: 'CollapseTextDemo' }}
      />
      <Stack.Screen name="HeaderDemo" component={HeaderDemo} options={{ header: () => null }} />
      <Stack.Screen name="NoticeBarDemo" component={NoticeBarDemo} options={{ headerTitle: 'NoticeBarDemo' }} />
      <Stack.Screen name="ProgressDemo" component={ProgressDemo} options={{ headerTitle: 'ProgressDemo' }} />
      <Stack.Screen name="SliderDemo" component={SliderDemo} options={{ headerTitle: 'SliderDemo' }} />
      <Stack.Screen name="SwipeRowDemo" component={SwipeRowDemo} options={{ headerTitle: 'SwipeRowDemo' }} />
      <Stack.Screen name="SwitchDemo" component={SwitchDemo} options={{ headerTitle: 'SwitchDemo' }} />
      <Stack.Screen name="ToastDemo" component={ToastDemo} options={{ headerTitle: 'ToastDemo' }} />
      <Stack.Screen name="ModalAlertDemo" component={ModalAlertDemo} options={{ headerTitle: 'ModalAlertDemo' }} />
      <Stack.Screen name="ModalPromptDemo" component={ModalPromptDemo} options={{ headerTitle: 'ModalPromptDemo' }} />
      <Stack.Screen
        name="ModalConfirmDemo"
        component={ModalConfirmDemo}
        options={{ headerTitle: 'ModalConfirmDemo' }}
      />
      <Stack.Screen name="ModalTipDemo" component={ModalTipDemo} options={{ headerTitle: 'ModalTipDemo' }} />
      <Stack.Screen name="StepperDemo" component={StepperDemo} options={{ headerTitle: 'StepperDemo' }} />
      <Stack.Screen name="DarkThemeDemo" component={DarkThemeDemo} options={{ headerTitle: 'DarkThemeDemo' }} />
      <Stack.Screen name="ButtonDemo" component={ButtonDemo} options={{ headerTitle: 'ButtonDemo' }} />
      <Stack.Screen name="InputDemo" component={InputDemo} options={{ headerTitle: 'InputDemo' }} />
      <Stack.Screen name="ActionSheetDemo" component={ActionSheetDemo} options={{ headerTitle: 'ActionSheetDemo' }} />
      <Stack.Screen name="CardDemo" component={CardDemo} options={{ headerTitle: 'CardDemo' }} />
      <Stack.Screen name="BadgeDemo" component={BadgeDemo} options={{ headerTitle: 'BadgeDemo' }} />
      <Stack.Screen
        name="ModalDemo"
        component={ModalDemo}
        options={{
          //headerTitle: 'ModalDemo'
          headerShown: false,
        }}
      />
      <Stack.Screen name="DividerDemo" component={DividerDemo} options={{ headerTitle: 'DividerDemo' }} />
      <Stack.Screen name="TagDemo" component={TagDemo} options={{ headerTitle: 'TagDemo' }} />
      <Stack.Screen name="SearchBarDemo" component={SearchBarDemo} options={{ headerTitle: 'SearchBarDemo' }} />
      <Stack.Screen name="ImageDemo" component={ImageDemo} options={{ headerTitle: 'ImageDemo' }} />
      <Stack.Screen name="ListDemo" component={ListDemo} options={{ headerTitle: 'ListDemo' }} />
      <Stack.Screen name="ListItemDemo" component={ListItemDemo} options={{ headerTitle: 'ListItemDemo' }} />
      <Stack.Screen name="AvatarDemo" component={AvatarDemo} options={{ headerTitle: 'AvatarDemo' }} />
      <Stack.Screen name="EmptyDemo" component={EmptyDemo} options={{ headerTitle: 'EmptyDemo' }} />
      <Stack.Screen name="SwiperDemo" component={SwiperDemo} options={{ headerTitle: 'SwiperDemo' }} />
      <Stack.Screen name="TableDemo" component={TableDemo} options={{ headerTitle: 'TableDemo' }} />
      <Stack.Screen name="FlowDemo" component={FlowDemo} options={{ headerTitle: 'FlowDemo' }} />
      <Stack.Screen
        name="NumberKeyboardDemo"
        component={NumberKeyboardDemo}
        options={{ headerTitle: 'NumberKeyboardDemo' }}
      />
      <Stack.Screen name="WhiteSpaceDemo" component={WhiteSpaceDemo} options={{ headerTitle: 'WhiteSpaceDemo' }} />
      <Stack.Screen name="ButtonGroupDemo" component={ButtonGroupDemo} options={{ headerTitle: 'ButtonGroupDemo' }} />
      <Stack.Screen name="WingBlankDemo" component={WingBlankDemo} options={{ headerTitle: 'WingBlankDemo' }} />
      <Stack.Screen name="TextDemo" component={TextDemo} options={{ headerTitle: 'TextDemo' }} />
      <Stack.Screen name="PaginationDemo" component={PaginationDemo} options={{ headerTitle: 'PaginationDemo' }} />
      <Stack.Screen name="TimeLineDemo" component={TimeLineDemo} options={{ headerTitle: 'TimeLineDemo' }} />
      <Stack.Screen name="TreeDemo" component={TreeDemo} options={{ headerTitle: 'TreeDemo' }} />
      <Stack.Screen name="BoxShadowDemo" component={BoxShadowDemo} options={{ headerTitle: 'BoxShadowDemo' }} />
      <Stack.Screen name="CountDownDemo" component={CountDownDemo} options={{ headerTitle: 'CountDownDemo' }} />
      <Stack.Screen name="TooltipDemo" component={TooltipDemo} options={{ headerTitle: 'TooltipDemo' }} />
      <Stack.Screen name="IndicatorDemo" component={IndicatorDemo} options={{ headerTitle: 'IndicatorDemo' }} />
      <Stack.Screen name="CheckboxDemo" component={CheckboxDemo} options={{ headerTitle: 'CheckboxDemo' }} />
      <Stack.Screen name="RadioDemo" component={RadioDemo} options={{ headerTitle: 'RadioDemo' }} />
      <Stack.Screen name="FlexDemo" component={FlexDemo} options={{ headerTitle: 'FlexDemo' }} />
      <Stack.Screen name="CenterDemo" component={CenterDemo} options={{ headerTitle: 'CenterDemo' }} />
      <Stack.Screen name="PressableDemo" component={PressableDemo} options={{ headerTitle: 'PressableDemo' }} />
      <Stack.Screen name="LinkDemo" component={LinkDemo} options={{ headerTitle: 'LinkDemo' }} />
      <Stack.Screen name="PasscodeDemo" component={PasscodeDemo} options={{ headerTitle: 'PasscodeDemo' }} />
      <Stack.Screen
        name="PullToRefreshDemo"
        component={PullToRefreshDemo}
        options={{ headerTitle: 'PullToRefreshDemo' }}
      />
      <Stack.Screen
        name="ScrollNumberDemo"
        component={ScrollNumberDemo}
        options={{ headerTitle: 'ScrollNumberDemo' }}
      />
    </Stack.Navigator>
  );
};

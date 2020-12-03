import React from 'react';
import {
  StackHeaderProps,
  StackHeaderLeftButtonProps,
  StackNavigationOptions,
  Header,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { helpers, Icon, Theme } from '@td-design/react-native';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { NavigationProp, RouteProp } from '@react-navigation/native';

const { px } = helpers;

export const commonStackOptions = () => {
  const theme = useTheme<Theme>();

  return {
    header: (props: StackHeaderProps) => <Header {...props} />,
    headerTitleStyle: {
      fontWeight: '500',
      color: theme.colors.primaryTextColor,
      fontSize: px(18),
    },
    headerTransparent: true,
    headerTitleAlign: 'center',
    headerLeft: (props: StackHeaderLeftButtonProps) =>
      props.canGoBack && (
        <TouchableOpacity activeOpacity={0.8} onPress={props.onPress} style={{ marginLeft: 0, padding: px(10) }}>
          <Icon name="left" size={px(20)} color={theme.colors.primaryColor} />
        </TouchableOpacity>
      ),
    gestureEnabled: true,
    gestureDirection: 'horizontal',
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  } as StackNavigationOptions;
};

export type ParamList = {
  Homepage: undefined;
  TabsDemo: undefined;
  ModalPickerDemo: undefined;
  ModalAlertDemo: undefined;
  ProgressDemo: undefined;
  ModalPromptDemo: undefined;
  ModalTipDemo: undefined;
  StepperDemo: undefined;
  DarkThemeDemo: undefined;
  ButtonDemo: undefined;
  SwitchDemo: undefined;
  InputDemo: undefined;
  ActionSheetDemo: undefined;
  CardDemo: undefined;
  BadgeDemo: undefined;
  AccordionDemo: undefined;
  ModalDemo: undefined;
  IconDemo: undefined;
  DividerDemo: undefined;
  ImagePickerDemo: undefined;
  TagDemo: undefined;
  ModalDatePickerDemo: undefined;
  HeaderDemo: undefined;
  SearchBarDemo: undefined;
  SliderDemo: undefined;
  ImageDemo: undefined;
  ListItemDemo: undefined;
  AvatarDemo: undefined;
  RatingDemo: undefined;
  ShareDemo: undefined;
  EmptyDemo: undefined;
  NoticeBarDemo: undefined;
  CheckableDemo: undefined;
  ToastDemo: undefined;
  SwiperDemo: undefined;
  FloatButtonDemo: undefined;
  SwipeRowDemo: undefined;
  AutoCompleteDemo: undefined;
  CollapseTextDemo: undefined;
};
export interface ScreenProps {
  route: RouteProp<ParamList, keyof ParamList>;
  navigation: NavigationProp<ParamList, keyof ParamList>;
}

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

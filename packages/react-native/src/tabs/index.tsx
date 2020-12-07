import React, { FC } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs/lib/typescript/src/types';
import { useTheme } from '@shopify/restyle';

import { Theme } from '../config/theme';
import TabBar from './TabBar';
import { TabsProps } from './type';

const { Navigator, Screen } = createMaterialTopTabNavigator();
const Tabs: FC<TabsProps> = ({ tabBar, tabBarOptions, children, ...restProps }) => {
  const theme = useTheme<Theme>();

  const defaultTabBarOptions = {
    /** 是否显示tab项文本 */
    showLabel: true,
    /** 是否显示tab项图标 */
    showIcon: true,
    /** 是否显示badge徽标 */
    showBadge: true,
    /** 是否允许tab项文本随系统缩放 */
    allowFontScaling: false,
    ...tabBarOptions,
  };

  /** 当前tab项选中时的文本颜色 */
  const activeTintColor = tabBarOptions?.activeTintColor ?? theme.colors.primaryColor;
  /** 当前tab项未选中时的文本颜色 */
  const inactiveTintColor = tabBarOptions?.inactiveTintColor ?? theme.colors.primaryTipColor;

  return (
    <Navigator
      {...restProps}
      tabBar={
        tabBar
          ? tabBar
          : (props: MaterialTopTabBarProps) => (
              <TabBar {...{ ...defaultTabBarOptions, ...props }} {...{ activeTintColor, inactiveTintColor }} />
            )
      }
    >
      {children}
    </Navigator>
  );
};

export default Object.assign(Tabs, { Screen });

import React from 'react';
import {
  useNavigationBuilder,
  createNavigatorFactory,
  DefaultNavigatorOptions,
  TabRouter,
  TabRouterOptions,
  TabNavigationState,
  TabActionHelpers,
  ParamListBase,
} from '@react-navigation/native';
import TopTabView from '../views/TopTabView';
import type { TopTabNavigationConfig, TopTabNavigationOptions, TopTabNavigationEventMap } from '../types';

export type TopTabNavigatorProps = DefaultNavigatorOptions<TopTabNavigationOptions> &
  TabRouterOptions &
  TopTabNavigationConfig;

function TopTabNavigator({ initialRouteName, backBehavior, children, screenOptions, ...rest }: TopTabNavigatorProps) {
  const { state, descriptors, navigation } = useNavigationBuilder<
    TabNavigationState<ParamListBase>,
    TabRouterOptions,
    TabActionHelpers<ParamListBase>,
    TopTabNavigationOptions,
    TopTabNavigationEventMap
  >(TabRouter, {
    initialRouteName,
    backBehavior,
    children,
    screenOptions,
  });

  return <TopTabView {...rest} state={state} navigation={navigation} descriptors={descriptors} />;
}

export default createNavigatorFactory<
  TabNavigationState<ParamListBase>,
  TopTabNavigationOptions,
  TopTabNavigationEventMap,
  typeof TopTabNavigator
>(TopTabNavigator);

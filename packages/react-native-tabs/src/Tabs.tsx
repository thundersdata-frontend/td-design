import React, { createRef, FC, useEffect } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';

import TabBar from './TabBar';
import { CustomRoute, TabsProps } from './type';

const Tabs: FC<TabsProps> = ({
  bounces,
  tabBarStyle,
  onTabPress,
  showIcon = false,
  showIndicator = true,
  textStyle,
  indicatorStyle,
  activeTab,
  ...props
}) => {
  const layout = useWindowDimensions();

  const scenes: Record<string, any> = {};
  const routes: CustomRoute[] = [];
  props.scenes.forEach(item => {
    scenes[item.key] = item.scene;
    routes.push({
      ...item,
      ref: createRef<View>(),
    });
  });

  const renderScene = SceneMap(scenes);

  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    const activeIndex = routes.findIndex(item => item.key === activeTab);
    setIndex(activeIndex);
  }, [activeTab]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      tabBarPosition="top"
      keyboardDismissMode="on-drag"
      lazy={props.lazy}
      swipeEnabled={props.swipeEnabled}
      renderTabBar={props => (
        <TabBar
          {...props}
          {...{ bounces, tabBarStyle, onTabPress, showIcon, showIndicator, textStyle, indicatorStyle }}
        />
      )}
    />
  );
};

export default Tabs;

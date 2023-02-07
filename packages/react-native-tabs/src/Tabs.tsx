import React, { createRef, FC } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';

import TabBar from './TabBar';
import { CustomRoute, TabsProps } from './type';

const Tabs: FC<TabsProps> = ({
  bounces,
  tabBarStyle,
  onTabPress,
  showIcon = true,
  showIndicator = true,
  textStyle,
  indicatorStyle,
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
  const activeIndex = routes.findIndex(item => item.key === props.activeTab);

  const [index, setIndex] = React.useState(activeIndex === -1 ? 0 : activeIndex);

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

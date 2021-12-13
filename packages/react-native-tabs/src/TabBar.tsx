import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

import TabBarIndicator from './TabBarIndicator';
import TabBarItem from './TabBarItem';

import { Measure, TabBarProps, TabBarItemProps } from './type';

export default function TabBar(props: TabBarProps) {
  const scrollViewRef = useRef<Animated.ScrollView>(null);
  const [measures, setMeasures] = useState<Measure[]>([]);

  useEffect(() => {
    setTimeout(() => {
      const m: Measure[] = [];
      props.navigationState.routes.forEach((route, _, array) => {
        route.ref.current?.measureLayout(
          scrollViewRef.current as any,
          (left, top, width, height) => {
            m.push({ left, top, width, height });
            if (m.length === array.length) {
              setMeasures(m);
            }
          },
          () => {}
        );
      });
    }, 0);
  }, [props.navigationState.routes, setMeasures]);

  const tabBarWidth = useMemo(() => {
    if (measures.length === 0) return 0;

    const { left, width } = measures[measures.length - 1];
    return left + width;
  }, [measures]);

  return (
    <View>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        accessibilityRole="tablist"
        keyboardShouldPersistTaps="handled"
        scrollEnabled={false} // <- TODO 尝试作为props传进来，目前问题是在滚动时怎么让Indicator也跟着滚动
        bounces={props.bounces}
        alwaysBounceHorizontal={false}
        scrollsToTop={false}
        showsHorizontalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        overScrollMode="never"
        contentContainerStyle={[
          {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexWrap: 'nowrap',
            height: 40,
          },
          { flex: 1 }, // scrollEnabled
          props.tabBarStyle,
        ]}
        scrollEventThrottle={16}
      >
        {props.navigationState.routes.map((route, idx) => {
          const { key, ...otherProps } = route;
          const itemProps: TabBarItemProps = {
            ...otherProps,
            navigationState: props.navigationState,
            showIcon: props.showIcon,
            textStyle: props.textStyle,
            active: props.navigationState.index === idx,
            onPress: () => {
              const event = {
                route,
                defaultPrevented: false,
                preventDefault: () => {
                  event.defaultPrevented = true;
                },
              };
              props.onTabPress?.(event);
              if (event.defaultPrevented) {
                return;
              }
              props.jumpTo(key);
            },
          };

          console.log(itemProps);
          return <TabBarItem key={key} {...itemProps} />;
        })}
      </Animated.ScrollView>
      <View
        style={[
          { position: 'relative', width: tabBarWidth },
          // scrollEnabled
        ]}
      >
        {measures.length > 0 && (
          <TabBarIndicator
            measures={measures}
            currentIndex={props.navigationState.index}
            indicatorStyle={props.indicatorStyle}
          />
        )}
      </View>
    </View>
  );
}

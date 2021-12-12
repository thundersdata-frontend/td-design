import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

import TabBarIndicator from './TabBarIndicator';
import TabItem from './TabItem';

import { Measure, TabBarProps, TabItemProps } from './type';

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

  console.log(tabBarWidth);
  return (
    <View>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        accessibilityRole="tablist"
        keyboardShouldPersistTaps="handled"
        scrollEnabled={props.scrollEnabled}
        bounces={props.bounces}
        alwaysBounceHorizontal={false}
        scrollsToTop={false}
        showsHorizontalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        overScrollMode="never"
        contentContainerStyle={[
          { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'nowrap', height: 40 },
          props.scrollEnabled ? {} : { flex: 1 },
          props.tabBarStyle,
        ]}
        scrollEventThrottle={16}
      >
        {props.navigationState.routes.map(route => {
          const itemProps: TabItemProps = {
            title: route.title,
            ref: route.ref,
            scrollEnabled: props.scrollEnabled,
            navigationState: props.navigationState,
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
              props.jumpTo(route.key);
            },
          };
          return <TabItem key={route.key} {...itemProps} />;
        })}
      </Animated.ScrollView>
      {measures.length > 0 && <TabBarIndicator measures={measures} currentIndex={props.navigationState.index} />}
    </View>
  );
}

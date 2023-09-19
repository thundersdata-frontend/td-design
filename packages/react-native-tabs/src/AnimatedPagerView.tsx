import React, { DependencyList, forwardRef, PropsWithChildren } from 'react';
import PagerView from 'react-native-pager-view';
import Animated, { runOnJS, useEvent, useHandler } from 'react-native-reanimated';

import { AnimatedPagerViewProps } from './type';
import usePagerView from './usePagerView';

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Obj = Record<string, any>;

export function usePagerScrollHandler<T extends Obj>(
  handlers: Record<string, (event: T, context: Obj) => void>,
  dependencies?: DependencyList
) {
  const { context, doDependenciesDiffer } = useHandler(handlers, dependencies);
  const subscribeForEvents = ['onPageScroll'];

  return useEvent<T>(
    event => {
      'worklet';
      const { onPageScroll } = handlers;
      if (onPageScroll && event.eventName.endsWith('onPageScroll')) {
        onPageScroll(event, context);
      }
    },
    subscribeForEvents,
    doDependenciesDiffer
  );
}

export default forwardRef<PagerView, PropsWithChildren<AnimatedPagerViewProps>>(
  ({ scrollEnabled, overdrag, keyboardDismissMode, children, onPageSelected }, ref) => {
    const { onPageScroll: _onPageScroll, page, onPageScrollStateChanged } = usePagerView.useModel();

    const handler = usePagerScrollHandler({
      onPageScroll: (e: { offset: number; position: number }) => {
        'worklet';
        runOnJS(_onPageScroll)(e);
      },
    });

    return (
      <AnimatedPagerView
        ref={ref}
        style={{ flex: 1 }}
        overdrag={overdrag}
        scrollEnabled={scrollEnabled}
        orientation={'horizontal'}
        keyboardDismissMode={keyboardDismissMode}
        overScrollMode="always"
        initialPage={page}
        onPageScroll={handler}
        onPageSelected={onPageSelected}
        onPageScrollStateChanged={onPageScrollStateChanged}
      >
        {children}
      </AnimatedPagerView>
    );
  }
);

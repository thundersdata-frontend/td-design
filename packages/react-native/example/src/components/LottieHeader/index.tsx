import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import {
  PullToRefreshHeaderRef,
  PullToRefreshHeaderProps,
} from '@td-design/react-native/lib/typescript/pull-to-refresh/type';

export const LottieHeader = forwardRef<PullToRefreshHeaderRef, PullToRefreshHeaderProps>(
  ({ refreshing, headerHeight = 80 }, ref) => {
    const [progress, setProgress] = useState(0);
    const lottie = useRef<LottieView>(null);

    useEffect(() => {
      setProgress(+refreshing);
    }, [refreshing]);

    useImperativeHandle(ref, () => {
      return {
        setProgress,
      };
    });

    const style = useAnimatedStyle(() => ({
      opacity: progress,
      transform: [
        {
          translateY: -headerHeight,
        },
      ],
    }));

    useEffect(() => {
      if (progress === 1) {
        lottie.current?.play();
      }
    }, [progress]);

    return (
      <Animated.View
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: headerHeight,
          },
          style,
        ]}
      >
        <LottieView ref={lottie} source={require('../../../assets/loading.json')} loop progress={progress} />
      </Animated.View>
    );
  }
);

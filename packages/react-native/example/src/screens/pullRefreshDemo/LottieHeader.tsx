import React, { forwardRef, useImperativeHandle, useState } from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { PullRefreshHeaderProps, PullRefreshHeaderRef } from '@td-design/react-native/lib/typescript/pull-refresh/type';
import LottieView from 'lottie-react-native';

export const LottieHeader = forwardRef<PullRefreshHeaderRef, PullRefreshHeaderProps>(
  ({ headerHeight, headerStyle }, ref) => {
    const [statePercent, setPercent] = useState(0);

    useImperativeHandle(ref, () => {
      return {
        setProgress,
      };
    });

    /** 必须要暴露出去 */
    const setProgress = ({ percent }: { percent: number }) => {
      setPercent(percent);
    };

    const style = useAnimatedStyle(() => ({
      opacity: statePercent,
      transform: [
        {
          translateY: -(headerHeight ?? 0),
        },
      ],
    }));

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
          headerStyle,
        ]}
      >
        <LottieView source={require('./loading.json')} loop autoPlay />
      </Animated.View>
    );
  }
);

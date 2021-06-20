import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { PullRefreshHeaderProps, PullRefreshHeaderRef } from './type';
import Icon from '../icon';
import { UIActivityIndicator } from '../indicator';

export const DefaultHeader = forwardRef<
  PullRefreshHeaderRef,
  PullRefreshHeaderProps & {
    pullDownText?: string;
    refreshingText?: string;
    releaseText?: string;
  }
>(
  (
    {
      refreshing,
      headerHeight,
      headerStyle,
      pullDownText = '下拉进行刷新',
      refreshingText = '正在刷新数据中...',
      releaseText = '释放立刻刷新',
    },
    ref
  ) => {
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

    let text = pullDownText;
    let icon = <Icon name="arrowdown" size={20} color="black" />;
    if (statePercent >= 1) {
      if (refreshing) {
        text = refreshingText;
        icon = <UIActivityIndicator size={20} color="black" />;
      } else {
        text = releaseText;
      }
    }

    const style = useAnimatedStyle(() => ({
      opacity: statePercent,
      transform: [
        {
          translateY: -(headerHeight ?? 0),
        },
      ],
    }));

    const iconStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            rotate: statePercent >= 1 ? '180deg' : '0deg',
          },
        ],
      };
    });

    return (
      <Animated.View style={[styles.wrapper, { height: headerHeight }, style, headerStyle]}>
        <Animated.View style={iconStyle}>{icon}</Animated.View>
        <Text style={styles.title}>{text}</Text>
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginLeft: 10,
  },
});

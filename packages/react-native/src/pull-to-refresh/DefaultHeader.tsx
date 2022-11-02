import React, { forwardRef, useImperativeHandle, useState, useMemo, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { PullToRefreshHeaderProps, PullToRefreshHeaderRef } from './type';
import SvgIcon from '../svg-icon';
import UIActivityIndicator from '../indicator/UIActivityIndicator';
import { mix } from 'react-native-redash';

export const DefaultHeader = forwardRef<
  PullToRefreshHeaderRef,
  PullToRefreshHeaderProps & {
    pullDownText?: string;
    refreshingText?: string;
    releaseText?: string;
  }
>(
  (
    {
      refreshing,
      headerHeight,
      pullDownText = '下拉进行刷新',
      refreshingText = '正在刷新数据中...',
      releaseText = '释放立刻刷新',
    },
    ref
  ) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      setProgress(+refreshing);
    }, [refreshing]);

    useImperativeHandle(ref, () => {
      return {
        setProgress,
      };
    });

    const { text, icon } = useMemo(() => {
      let text = pullDownText;
      let icon = <SvgIcon name="arrowdown" size={20} color="black" />;
      if (progress >= 1) {
        if (refreshing) {
          text = refreshingText;
          icon = <UIActivityIndicator size={16} color="black" />;
        } else {
          text = releaseText;
        }
      }
      return {
        text,
        icon,
      };
    }, [pullDownText, refreshing, refreshingText, releaseText, progress]);

    const style = useAnimatedStyle(() => ({
      opacity: progress,
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
            rotateZ: `${mix(progress, -Math.PI, Math.PI)}rad`,
          },
        ],
      };
    });

    return (
      <Animated.View style={[styles.wrapper, { height: headerHeight }, style]}>
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

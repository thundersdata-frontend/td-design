import React, { FC, ReactNode, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { mix } from 'react-native-redash';
import { useTheme } from '@shopify/restyle';

import UIActivityIndicator from '../indicator/UIActivityIndicator';
import BoxShadow from '../box-shadow';
import Flex from '../flex';
import Box from '../box';
import Text from '../text';
import Icon from '../icon';
import helpers from '../helpers';
import { Theme } from '../theme';

const { px } = helpers;
export interface ToastProps {
  content: ReactNode;
  position: 'top' | 'middle' | 'bottom';
  duration: number;
  autoClose: boolean;
  onClose?: () => void;
  onPress?: () => void;
}

export enum ToastType {
  INFO = 'info',
  SUCCESS = 'success',
  FAIL = 'fail',
  LOADING = 'loading',
  SUBMITTING = 'submitting',
}

const normalShadowOpt = {
  width: 300,
  height: 40,
  opacity: 0.16,
  border: 12,
  radius: 20,
};

const ToastContainer: FC<ToastProps & { type: ToastType; showClose: boolean }> = ({
  content,
  duration,
  autoClose,
  position,
  type,
  showClose = false,
  onClose,
  onPress,
}) => {
  const theme = useTheme<Theme>();
  const insets = useSafeAreaInsets();
  const startY = [ToastType.SUCCESS, ToastType.FAIL].includes(type)
    ? normalShadowOpt.height + 50
    : normalShadowOpt.height + 10;
  const endY = position === 'top' ? insets.top : -insets.bottom;

  const displayed = useSharedValue(0);
  useEffect(() => {
    displayed.value = withSpring(1);
  }, [displayed]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (autoClose) {
        displayed.value = withTiming(0, { duration: 300, easing: Easing.inOut(Easing.ease) }, () => {
          onClose && runOnJS(onClose)();
        });
        clearTimeout(timer);
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [autoClose, displayed, duration, onClose]);

  const style = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: mix(displayed.value, startY, endY),
      },
    ],
  }));

  const getColorByType = (type: ToastType) => {
    switch (type) {
      case ToastType.FAIL:
        return {
          iconColor: [244, 51, 60],
          shadowColor: theme.colors.func600,
          bgColor: theme.colors.func50,
        };
      case ToastType.INFO:
      case ToastType.SUCCESS:
      case ToastType.LOADING:
      default:
        return {
          iconColor: [0, 93, 255],
          shadowColor: theme.colors.primary200,
          bgColor: theme.colors.primary50,
        };
    }
  };

  const { shadowColor, bgColor, iconColor } = getColorByType(type);

  const Content = (
    <Flex flex={1} justifyContent="center" alignItems="center">
      {type === ToastType.SUCCESS && (
        <Box marginRight="x1">
          <Icon name="checkcircle" color={shadowColor} size={px(14)} />
        </Box>
      )}
      {type === ToastType.FAIL && (
        <Box marginRight="x1">
          <Icon name="closecircle" color={shadowColor} size={px(14)} />
        </Box>
      )}
      {type === ToastType.LOADING && (
        <Box marginRight="x1">
          <UIActivityIndicator size={20} color={shadowColor} />
        </Box>
      )}
      <Box>
        <Text style={{ fontSize: px(14), color: shadowColor }}>{content}</Text>
      </Box>
    </Flex>
  );

  return (
    <Animated.View
      style={[
        {
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          left: 0,
          right: 0,
        },
        position === 'top' ? { top: 0 } : { bottom: 0 },
        style,
      ]}
    >
      {position === 'top' && type !== ToastType.INFO && (
        <Flex justifyContent="center" alignItems="center">
          <Box style={{ marginBottom: px(4) }}>
            <Box>
              <Icon
                type="feather"
                name="chevron-up"
                color={`rgba(${iconColor.concat([0.41]).join(',')})`}
                size={px(14)}
              />
            </Box>
            <Box style={{ marginTop: -px(8) }}>
              <Icon type="feather" name="chevron-up" color={`rgba(${iconColor.concat([1]).join(',')})`} size={px(14)} />
            </Box>
          </Box>
        </Flex>
      )}
      <BoxShadow setting={{ ...normalShadowOpt, color: shadowColor }}>
        <Flex
          paddingHorizontal="x4"
          justifyContent="center"
          alignItems="center"
          width={normalShadowOpt.width}
          height={normalShadowOpt.height}
          style={{ borderRadius: normalShadowOpt.radius, backgroundColor: bgColor }}
        >
          {type === ToastType.INFO ? (
            <>
              {showClose ? (
                <TouchableOpacity activeOpacity={0.8} onPress={onClose} style={styles.content}>
                  {Content}
                  <Icon name="close" color={shadowColor} size={px(14)} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.content}>
                  {Content}
                  <Icon name="right" color={shadowColor} size={px(14)} />
                </TouchableOpacity>
              )}
            </>
          ) : (
            Content
          )}
        </Flex>
      </BoxShadow>
      {position === 'bottom' && type !== ToastType.INFO && (
        <Flex justifyContent="center" alignItems="center">
          <Box style={{ marginTop: 4 }}>
            <Box>
              <Icon
                type="feather"
                name="chevron-down"
                color={`rgba(${iconColor.concat([1]).join(',')})`}
                size={px(14)}
              />
            </Box>
            <Box style={{ marginTop: -8 }}>
              <Icon
                type="feather"
                name="chevron-down"
                color={`rgba(${iconColor.concat([0.41]).join(',')})`}
                size={px(14)}
              />
            </Box>
          </Box>
        </Flex>
      )}
    </Animated.View>
  );
};

export default ToastContainer;

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

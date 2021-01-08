import React, { FC, ReactNode } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { interpolate, set, SpringUtils, useCode, useValue } from 'react-native-reanimated';
import { spring, useClock } from 'react-native-redash';
import { useTheme } from '@shopify/restyle';

import BoxShadow from '../box-shadow';
import Flex from '../flex';
import Box from '../box';
import Text from '../text';
import Icon from '../icon';
import { px } from '../helper';
import { Theme } from '../config/theme';

export interface ToastProps {
  content: ReactNode;
  position: 'top' | 'middle' | 'bottom';
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

const ToastContainer: FC<ToastProps & { type: ToastType }> = ({ content, type, position, onClose, onPress }) => {
  const theme = useTheme<Theme>();
  const insets = useSafeAreaInsets();
  const displayed = useValue(0);
  const clock = useClock();

  useCode(
    () => [
      set(
        displayed,
        spring({
          from: 0,
          to: 1,
          clock,
          config: { ...SpringUtils.makeDefaultConfig() },
        })
      ),
    ],
    []
  );

  const outputRange = position === 'top' ? [0, insets.top] : [0, -insets.bottom - px(20)];
  const translateY = interpolate(displayed, {
    inputRange: [0, 1],
    outputRange,
  });

  const getColorByType = (type: ToastType) => {
    switch (type) {
      case ToastType.FAIL:
        return {
          iconColor: [244, 51, 60],
          shadowColor: theme.colors.fail,
          bgColor: theme.colors.exceptionBackground,
        };
      case ToastType.INFO:
      case ToastType.SUCCESS:
      case ToastType.LOADING:
      default:
        return {
          iconColor: [0, 93, 255],
          shadowColor: theme.colors.primaryColor,
          bgColor: theme.colors.normalBackground,
        };
    }
  };

  const { shadowColor, bgColor, iconColor } = getColorByType(type);

  const normalShadowOpt = {
    width: 300,
    height: 40,
    opacity: 0.16,
    border: 12,
    radius: 20,
  };

  return (
    <Animated.View
      style={[
        {
          transform: [{ translateY }],
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          left: 0,
          right: 0,
        },
        position === 'top' ? { top: 0 } : { bottom: 0 },
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
          paddingHorizontal="l"
          justifyContent="center"
          alignItems="center"
          width={normalShadowOpt.width}
          height={normalShadowOpt.height}
          style={{ borderRadius: normalShadowOpt.radius, backgroundColor: bgColor }}
        >
          <Flex flex={1} justifyContent="center" alignItems="center">
            {type === ToastType.SUCCESS && (
              <Box marginRight="xxs">
                <Icon name="checkcircle" color={shadowColor} size={px(14)} />
              </Box>
            )}
            {type === ToastType.FAIL && (
              <Box marginRight="xxs">
                <Icon name="closecircle" color={shadowColor} size={px(14)} />
              </Box>
            )}
            {type === ToastType.LOADING && (
              <Box marginRight="xs">
                <ActivityIndicator size="small" color={shadowColor} />
              </Box>
            )}
            <Box>
              <Text style={{ fontSize: px(14), color: shadowColor }}>{content}</Text>
            </Box>
          </Flex>
          {type === ToastType.INFO && onClose && !onPress && (
            <TouchableOpacity activeOpacity={0.8} onPress={onClose}>
              <Icon name="close" color={shadowColor} size={px(14)} />
            </TouchableOpacity>
          )}
          {type === ToastType.INFO && onPress && (
            <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
              <Icon name="right" color={shadowColor} size={px(14)} />
            </TouchableOpacity>
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

import React, { FC, ReactNode } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import { Shadow } from 'react-native-shadow-2';

import UIActivityIndicator from '../indicator/UIActivityIndicator';
import Flex from '../flex';
import Box from '../box';
import Text from '../text';
import SvgIcon from '../svg-icon';
import helpers from '../helpers';
import useToast from './useToast';
import { useLatest } from '@td-design/rn-hooks';

const { px, hexToRgba } = helpers;
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

export const normalShadowOpt = {
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
  const onCloseRef = useLatest(onClose);
  const onPressRef = useLatest(onPress);
  const insets = useSafeAreaInsets();
  const { shadowColor, bgColor, style } = useToast({
    position,
    duration,
    autoClose,
    type,
    onClose: onCloseRef.current,
  });

  const Content = (
    <Flex flex={1} justifyContent="center" alignItems="center">
      {type === ToastType.SUCCESS && (
        <Box marginRight="x1">
          <SvgIcon name="checkcircle" color={shadowColor} />
        </Box>
      )}
      {type === ToastType.FAIL && (
        <Box marginRight="x1">
          <SvgIcon name="closecircleo" color={shadowColor} />
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
        position === 'top' ? { top: -10 } : { bottom: -insets.bottom - 10 },
        style,
      ]}
    >
      {position === 'top' && type !== ToastType.INFO && (
        <Flex justifyContent="center" alignItems="center">
          <Box>
            <Box>
              <SvgIcon name="up" color={shadowColor} />
            </Box>
            <Box style={{ marginTop: -px(16) }}>
              <SvgIcon name="up" color={shadowColor} />
            </Box>
          </Box>
        </Flex>
      )}
      <Shadow
        distance={8}
        startColor={hexToRgba(shadowColor, 0.16)}
        // startColor={Color(shadowColor).alpha(0.16).string()}
      >
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
                <TouchableOpacity activeOpacity={0.5} onPress={onCloseRef.current} style={styles.content}>
                  {Content}
                  <SvgIcon name="close" color={shadowColor} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity activeOpacity={0.5} onPress={onPressRef.current} style={styles.content}>
                  {Content}
                  <SvgIcon name="right" color={shadowColor} />
                </TouchableOpacity>
              )}
            </>
          ) : (
            Content
          )}
        </Flex>
      </Shadow>
      {position === 'bottom' && type !== ToastType.INFO && (
        <Flex justifyContent="center" alignItems="center">
          <Box>
            <Box style={{ marginTop: 8 }}>
              <SvgIcon name="down" color={shadowColor} />
            </Box>
            <Box style={{ marginTop: -16 }}>
              <SvgIcon name="down" color={shadowColor} />
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

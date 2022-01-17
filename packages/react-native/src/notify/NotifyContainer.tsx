import React, { FC, ReactNode } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import { Shadow } from 'react-native-shadow-2';

import Flex from '../flex';
import Box from '../box';
import Text from '../text';
import SvgIcon from '../svg-icon';
import helpers from '../helpers';
import useNotify from './useNotify';
import { useLatest } from '@td-design/rn-hooks';

const { px, deviceWidth, hexToRgba } = helpers;
export interface NotifyProps {
  content: ReactNode;
  duration: number;
  autoClose: boolean;
  onClose?: () => void;
  onPress?: () => void;
}

export enum NotifyType {
  INFO = 'info',
  SUCCESS = 'success',
  FAIL = 'fail',
}

export const normalShadowOpt = {
  width: deviceWidth - px(32),
  height: px(40),
  radius: px(20),
  opacity: 0.16,
  border: 12,
};

const NotifyContainer: FC<NotifyProps & { type: NotifyType; showClose: boolean }> = ({
  content,
  duration,
  autoClose,
  type,
  showClose = false,
  onClose,
  onPress,
}) => {
  const onCloseRef = useLatest(onClose);
  const onPressRef = useLatest(onPress);
  const insets = useSafeAreaInsets();
  const { shadowColor, bgColor, style } = useNotify({
    duration,
    autoClose,
    type,
    onClose: onCloseRef.current,
  });

  const Content = (
    <Flex flex={1} justifyContent="center" alignItems="center">
      {type === NotifyType.SUCCESS && (
        <Box marginRight="x1">
          <SvgIcon name="checkcircle" color={shadowColor} />
        </Box>
      )}
      {type === NotifyType.FAIL && (
        <Box marginRight="x1">
          <SvgIcon name="closecircleo" color={shadowColor} />
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
        { bottom: -insets.bottom },
        style,
      ]}
    >
      <Shadow
        distance={8}
        startColor={hexToRgba(shadowColor, normalShadowOpt.opacity)}
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
          {type === NotifyType.INFO ? (
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
    </Animated.View>
  );
};

export default NotifyContainer;

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

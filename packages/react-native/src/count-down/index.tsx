import { useTheme } from '@shopify/restyle';
import React, { forwardRef, useImperativeHandle } from 'react';
import { Text, TouchableOpacity, ViewStyle } from 'react-native';
import { Theme } from '../config/theme';
import { px } from '../helper';
import useSms from './useSms';

export interface CountDownProps {
  /** 倒计时文字，默认为 获取验证码 */
  label?: string;
  /** 倒计时时长，默认为 60秒 */
  count?: number;
  /** 发送验证码 */
  handleClick: () => void;
  /** 倒计时结束后的回调 */
  onEnd?: () => void;
  /** 样式 */
  style?: ViewStyle;
}

export type CountDownRef = {
  onStart: () => void;
};

const CountDown = forwardRef<CountDownRef, CountDownProps>(
  ({ label = '获取验证码', count = 60, handleClick, onEnd, style }, ref) => {
    const theme = useTheme<Theme>();
    const { onClick, onStart, smsText } = useSms(label, count, handleClick, onEnd);

    useImperativeHandle(ref, () => {
      return {
        onStart,
      };
    });

    return (
      <TouchableOpacity
        style={[{ justifyContent: 'center', alignItems: 'center' }, style]}
        activeOpacity={0.8}
        hitSlop={{ top: 20, bottom: 20 }}
        onPress={onClick}
      >
        <Text style={{ fontSize: px(12), color: theme.colors.primaryColor }}>{smsText}</Text>
      </TouchableOpacity>
    );
  }
);

export default CountDown;

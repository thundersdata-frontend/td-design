import React, { forwardRef, useImperativeHandle } from 'react';
import { Text, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '@shopify/restyle';
import Input, { InputProps } from '../input';
import { Theme } from '../config/theme';
import { ONE_PIXEL, px } from '../helper';
import useSms from './useSms';

export interface CountDownProps extends Pick<InputProps, 'value' | 'onChange'> {
  /** 倒计时文字，默认为 获取验证码 */
  label?: string;
  /** 倒计时时长，默认为 60秒 */
  count?: number;
  /** 验证码样式是否有边框 */
  codeType?: 'normal' | 'border';
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

const { InputItem } = Input;

const CountDown = forwardRef<CountDownRef, CountDownProps>(
  ({ label = '获取验证码', value, count = 60, codeType = 'normal', onChange, handleClick, onEnd, style }, ref) => {
    const theme = useTheme<Theme>();
    const { onClick, onStart, smsText, disabled } = useSms(label, count, handleClick, onEnd);

    useImperativeHandle(ref, () => {
      return {
        onStart,
      };
    });

    return (
      <InputItem
        label="验证码"
        placeholder="请输入验证码"
        value={value}
        onChange={onChange}
        extra={
          <TouchableOpacity
            style={[
              { justifyContent: 'center', alignItems: 'center' },
              codeType === 'border' && {
                borderWidth: ONE_PIXEL,
                paddingHorizontal: px(16),
                paddingVertical: px(6),
                borderRadius: px(4),
              },
              { borderColor: disabled ? theme.colors.disabledColor : theme.colors.primaryColor },
              style,
            ]}
            activeOpacity={0.8}
            hitSlop={{ top: 20, bottom: 20 }}
            onPress={onClick}
          >
            <Text
              style={{ fontSize: px(14), color: disabled ? theme.colors.disabledColor : theme.colors.primaryColor }}
            >
              {smsText}
            </Text>
          </TouchableOpacity>
        }
      />
    );
  }
);

export default CountDown;

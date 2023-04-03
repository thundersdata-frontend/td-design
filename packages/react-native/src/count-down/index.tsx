import React, { forwardRef, ReactNode } from 'react';
import { Keyboard, StyleProp, TextInput, TouchableOpacity, ViewStyle } from 'react-native';

import { useTheme } from '@shopify/restyle';
import { useSms } from '@td-design/rn-hooks';

import helpers from '../helpers';
import Input, { InputProps } from '../input';
import Text from '../text';
import { Theme } from '../theme';

const { px, ONE_PIXEL } = helpers;
export interface SmsProps {
  /** 倒计时文字，默认为 获取验证码 */
  label?: string;
  /** 重新发送文字，默认为：重新发送 */
  resendLabel?: string;
  /** 倒计时时长，默认为 60秒 */
  count?: number;
  /** 发送验证码之前的回调，通常用于判断手机号是否有值 */
  onBefore?: () => Promise<boolean>;
  /** 发送验证码 */
  onSend: () => void;
  /** 倒计时结束后的回调 */
  onEnd?: () => void;
}
export interface CountDownProps extends Pick<InputProps, 'placeholder' | 'leftIcon' | 'value' | 'onChange'>, SmsProps {
  /** 是否显示边框 */
  bordered?: boolean;
  /** 验证码样式是否有边框 */
  codeType?: 'normal' | 'border';
  /** 额外内容 */
  brief?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const { InputItem } = Input;

const CountDown = forwardRef<TextInput, CountDownProps>(
  (
    {
      bordered = false,
      label = '发送验证码',
      resendLabel = '重新发送',
      placeholder = '请输入验证码',
      leftIcon,
      value,
      count = 60,
      codeType = 'normal',
      onChange,
      onBefore,
      onSend,
      onEnd,
      brief,
      style,
    },
    ref
  ) => {
    const theme = useTheme<Theme>();
    const { sendSms, text, disabled } = useSms({
      defaultLabel: label,
      resendLabel,
      count,
      onBefore,
      onSend,
      onAfter: onEnd,
      ref,
    });

    if (bordered) {
      return (
        <Input
          placeholder={placeholder}
          ref={ref}
          leftIcon={leftIcon}
          keyboardType="number-pad"
          rightIcon={
            <TouchableOpacity
              style={[
                { justifyContent: 'center', alignItems: 'center' },
                codeType === 'border' && {
                  borderWidth: ONE_PIXEL,
                  paddingHorizontal: px(16),
                  paddingVertical: px(6),
                  borderRadius: px(4),
                },
                { borderColor: disabled ? theme.colors.disabled : theme.colors.border },
              ]}
              disabled={disabled}
              activeOpacity={0.5}
              hitSlop={{ top: 20, bottom: 20 }}
              onPress={() => {
                Keyboard.dismiss();
                sendSms();
              }}
            >
              <Text variant={'p1'} color={disabled ? 'disabled' : 'primary200'}>
                {text}
              </Text>
            </TouchableOpacity>
          }
          value={value}
          onChange={onChange}
          brief={brief}
          style={style}
        />
      );
    }

    return (
      <InputItem
        ref={ref}
        label="验证码"
        placeholder={placeholder}
        keyboardType="number-pad"
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
                borderColor: theme.colors.border,
              },
            ]}
            disabled={disabled}
            activeOpacity={0.5}
            hitSlop={{ top: 20, bottom: 20 }}
            onPress={() => {
              sendSms();
            }}
          >
            <Text variant={'p1'} color={disabled ? 'disabled' : 'primary200'}>
              {text}
            </Text>
          </TouchableOpacity>
        }
        brief={brief}
        style={style}
      />
    );
  }
);
CountDown.displayName = 'CountDown';

export default CountDown;

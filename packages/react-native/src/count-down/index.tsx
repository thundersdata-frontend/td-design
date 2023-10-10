import React, { forwardRef, ReactNode } from 'react';
import { Keyboard, StyleProp, StyleSheet, TextInput, ViewStyle } from 'react-native';

import { useTheme } from '@shopify/restyle';
import { useMemoizedFn, useSms } from '@td-design/rn-hooks';

import helpers from '../helpers';
import Input, { InputProps } from '../input';
import Pressable from '../pressable';
import Text from '../text';
import { Theme } from '../theme';

const { ONE_PIXEL } = helpers;
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
  /** 按下时的不透明度 */
  activeOpacity?: number;
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
      activeOpacity = 0.6,
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

    const handlePress = useMemoizedFn(() => {
      Keyboard.dismiss();
      sendSms();
    });

    const styles = StyleSheet.create({
      input: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: disabled ? theme.colors.disabled : theme.colors.border,
      },
      border: {
        borderWidth: ONE_PIXEL,
        paddingHorizontal: theme.spacing.x1,
        paddingVertical: theme.spacing.x1,
        borderRadius: theme.borderRadii.x1,
      },
    });

    if (bordered) {
      return (
        <Input
          placeholder={placeholder}
          ref={ref}
          leftIcon={leftIcon}
          keyboardType="number-pad"
          rightIcon={
            <Pressable
              style={[styles.input, codeType === 'border' && styles.border]}
              disabled={disabled}
              activeOpacity={activeOpacity}
              onPress={handlePress}
            >
              <Text variant={'p2'} color={disabled ? 'disabled' : 'primary200'}>
                {text}
              </Text>
            </Pressable>
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
          <Pressable
            style={[styles.input, codeType === 'border' && styles.border]}
            disabled={disabled}
            activeOpacity={activeOpacity}
            onPress={handlePress}
          >
            <Text variant={'p1'} color={disabled ? 'disabled' : 'primary200'}>
              {text}
            </Text>
          </Pressable>
        }
        brief={brief}
        style={style}
      />
    );
  }
);
CountDown.displayName = 'CountDown';

export default CountDown;

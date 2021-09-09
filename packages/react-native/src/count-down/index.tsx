import React, { FC } from 'react';
import { Keyboard, Text, TouchableOpacity } from 'react-native';
import { useSms } from '@td-design/rn-hooks';
import { useTheme } from '@shopify/restyle';
import Input, { InputProps } from '../input';
import { Theme } from '../theme';
import helpers from '../helpers';

const { px, ONE_PIXEL } = helpers;
export interface SmsProps {
  /** 倒计时文字，默认为 获取验证码 */
  label?: string;
  /** 倒计时时长，默认为 60秒 */
  count?: number;
  /** 发送验证码之前的回调，通常用于判断手机号是否有值 */
  onBeforeSend?: () => Promise<boolean>;
  /** 发送验证码 */
  onSend: () => void;
  /** 倒计时结束后的回调 */
  onAfterSend?: () => void;
}
export interface CountDownProps extends Pick<InputProps, 'placeholder' | 'leftIcon' | 'value' | 'onChange'>, SmsProps {
  /** 是否显示边框 */
  bordered?: boolean;
  /** 验证码样式是否有边框 */
  codeType?: 'normal' | 'border';
}

const { InputItem } = Input;

const CountDown: FC<CountDownProps> = ({
  bordered = false,
  label = '发送验证码',
  placeholder = '请输入验证码',
  leftIcon,
  value,
  count = 60,
  codeType = 'normal',
  onChange,
  onBeforeSend,
  onSend,
  onAfterSend,
}) => {
  const theme = useTheme<Theme>();
  const { sendSms, text, disabled, inputRef } = useSms({
    defaultLabel: label,
    count,
    onBefore: onBeforeSend,
    onSend,
    onAfter: onAfterSend,
  });

  if (bordered) {
    return (
      <Input
        placeholder={placeholder}
        ref={inputRef as any}
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
            <Text
              style={{
                fontSize: px(14),
                color: disabled ? theme.colors.disabled : theme.colors.primary200,
              }}
            >
              {text}
            </Text>
          </TouchableOpacity>
        }
        value={value}
        onChange={onChange}
      />
    );
  }

  return (
    <InputItem
      ref={inputRef as any}
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
          <Text
            style={{
              fontSize: px(14),
              color: disabled ? theme.colors.disabled : theme.colors.primary200,
            }}
          >
            {text}
          </Text>
        </TouchableOpacity>
      }
    />
  );
};

export default CountDown;

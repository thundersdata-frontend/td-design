import React, { FC } from 'react';
import { Keyboard, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@shopify/restyle';
import Input, { InputProps } from '../input';
import { Theme } from '../theme';
import helpers from '../helpers';
import useSms, { SmsProps } from './useSms';

const { px, ONE_PIXEL } = helpers;
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
  const { handleClick, smsText, disabled, inputRef } = useSms({ label, count, onBeforeSend, onSend, onAfterSend });

  if (bordered) {
    return (
      <Input
        placeholder={placeholder}
        ref={inputRef}
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
              handleClick();
            }}
          >
            <Text
              style={{
                fontSize: px(14),
                color: disabled ? theme.colors.disabled : theme.colors.primary200,
              }}
            >
              {smsText}
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
      ref={inputRef}
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
            handleClick();
          }}
        >
          <Text
            style={{
              fontSize: px(14),
              color: disabled ? theme.colors.disabled : theme.colors.primary200,
            }}
          >
            {smsText}
          </Text>
        </TouchableOpacity>
      }
    />
  );
};

export default CountDown;

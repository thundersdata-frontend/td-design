import React, { FC } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@shopify/restyle';
import Input, { InputProps } from '../input';
import { Theme } from '../config/theme';
import { ONE_PIXEL, px } from '../helper';
import useSms from './useSms';

export interface CountDownProps extends Pick<InputProps, 'placeholder' | 'leftIcon' | 'value' | 'onChange'> {
  /** 是否显示边框 */
  bordered?: boolean;
  /** 倒计时文字，默认为 获取验证码 */
  label?: string;
  /** 倒计时时长，默认为 60秒 */
  count?: number;
  /** 验证码样式是否有边框 */
  codeType?: 'normal' | 'border';
  /** 发送验证码 */
  onClick: () => void;
  /** 倒计时结束后的回调 */
  onEnd?: () => void;
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
  onClick,
  onEnd,
}) => {
  const theme = useTheme<Theme>();
  const { handleClick, smsText, disabled } = useSms(label, count, onClick, onEnd);

  if (bordered) {
    return (
      <Input
        placeholder={placeholder}
        leftIcon={leftIcon}
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
              { borderColor: disabled ? theme.colors.countdown_border_disabled : theme.colors.countdown_border },
            ]}
            disabled={disabled}
            activeOpacity={0.8}
            hitSlop={{ top: 20, bottom: 20 }}
            onPress={() => {
              handleClick();
            }}
          >
            <Text
              style={{
                fontSize: px(14),
                color: disabled ? theme.colors.countdown_text_disabled : theme.colors.countdown_text,
              }}
            >
              {smsText}
            </Text>
          </TouchableOpacity>
        }
        keyboardType="number-pad"
        value={value}
        onChange={onChange}
      />
    );
  }

  return (
    <InputItem
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
            },
            { borderColor: disabled ? theme.colors.countdown_border_disabled : theme.colors.countdown_border },
          ]}
          disabled={disabled}
          activeOpacity={0.8}
          hitSlop={{ top: 20, bottom: 20 }}
          onPress={() => {
            handleClick();
          }}
        >
          <Text
            style={{
              fontSize: px(14),
              color: disabled ? theme.colors.countdown_text_disabled : theme.colors.countdown_text,
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

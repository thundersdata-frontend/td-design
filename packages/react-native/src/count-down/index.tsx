import React, { forwardRef } from 'react';
import { Keyboard, StyleSheet, TextInput } from 'react-native';

import { useTheme } from '@shopify/restyle';
import { useMemoizedFn, useSms } from '@td-design/rn-hooks';

import helpers from '../helpers';
import Input from '../input';
import Pressable from '../pressable';
import Text from '../text';
import { Theme } from '../theme';
import CountDownItem from './CountDownItem';
import { CountDownProps } from './type';

const { ONE_PIXEL } = helpers;

const CountDown = forwardRef<TextInput, CountDownProps>(
  (
    {
      sendText = '发送验证码',
      resendText = '重新发送',
      placeholder = '请输入验证码',
      count = 60,
      codeType = 'normal',
      onBefore,
      onSend,
      onEnd,
      activeOpacity = 0.6,
      ...restProps
    },
    ref
  ) => {
    const theme = useTheme<Theme>();
    const { sendSms, text, disabled } = useSms({
      defaultLabel: sendText,
      resendLabel: resendText,
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

    return (
      <Input
        ref={ref}
        placeholder={placeholder}
        {...restProps}
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
      />
    );
  }
);
CountDown.displayName = 'CountDown';

export default Object.assign(CountDown, { CountDownItem });

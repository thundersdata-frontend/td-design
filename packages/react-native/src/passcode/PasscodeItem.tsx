import React, { forwardRef, memo } from 'react';
import { Platform, StyleSheet, TextInput } from 'react-native';

import { useTheme } from '@shopify/restyle';
import { useBoolean } from '@td-design/rn-hooks';

import Box from '../box';
import { ONE_PIXEL, px } from '../helpers/normalize';
import { Theme } from '../theme';
import type { PasscodeItemProps } from './type';

const majorVersionIOS: number = parseInt(`${Platform.Version}`, 10);
const isOTPSupported: boolean = Platform.OS === 'ios' && majorVersionIOS >= 12;

const PasscodeItem = forwardRef<TextInput, PasscodeItemProps>(
  (
    {
      inputContainerStyle,
      focusStyle,
      inputStyle,
      inputValue,
      handleKeyPress,
      handleChangeText,
      selectTextOnFocus,
      ...rest
    },
    ref
  ) => {
    const theme = useTheme<Theme>();
    const [focused, { setTrue, setFalse }] = useBoolean(false);

    const styles = StyleSheet.create({
      input: {
        textAlign: 'center',
        height: px(40),
        width: px(40),
        padding: 0,
        color: theme.colors.gray500,
      },
    });

    return (
      <Box
        borderWidth={ONE_PIXEL}
        borderColor="primary200"
        borderRadius={'x1'}
        style={[inputContainerStyle, focused && focusStyle]}
      >
        <TextInput
          ref={ref}
          textAlignVertical="center"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          onBlur={setFalse}
          onFocus={setTrue}
          onKeyPress={handleKeyPress} // 键盘按下事件， 只用来处理键盘按下删除键的场景
          onChangeText={handleChangeText} // 输入框内容改变事件, 用来处理输入框内容改变的场景
          selectionColor={theme.colors.primary200}
          style={[styles.input, inputStyle]}
          textContentType={isOTPSupported ? 'oneTimeCode' : 'none'}
          multiline={false}
          underlineColorAndroid="transparent"
          // https://github.com/facebook/react-native/issues/18339
          selectTextOnFocus={Platform.select({
            ios: selectTextOnFocus,
            android: true,
          })}
          value={inputValue}
          {...rest}
        />
      </Box>
    );
  }
);
PasscodeItem.displayName = 'PasscodeItem';

export default memo(PasscodeItem);

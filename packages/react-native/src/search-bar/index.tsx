import React, { FC, PropsWithChildren, useMemo } from 'react';
import { KeyboardTypeOptions, ReturnKeyTypeOptions, StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import Flex from '../flex';
import helpers from '../helpers';
import InputItem from '../input/InputItem';
import Pressable from '../pressable';
import SvgIcon from '../svg-icon';
import Text from '../text';
import { Theme } from '../theme';
import useSearchBar from './useSearchBar';

const { ONE_PIXEL } = helpers;

export type SearchBarProps = PropsWithChildren<{
  /** 搜索框的placeholder */
  placeholder?: string;
  /** 是否展示取消按钮 */
  showCancelButton?: boolean;
  /** 是否允许清除 */
  allowClear?: boolean;
  /** 搜索框是否禁用 */
  disabled?: boolean;
  /** 搜索框的默认值 */
  defaultValue?: string;
  /** 是否自动focus */
  autoFocus?: boolean;
  /** 取消文字 */
  cancelText?: string;
  /** 键盘下方的按钮类型，默认为搜索 */
  returnKeyType?: ReturnKeyTypeOptions;
  /** 弹出键盘类型 */
  keyboardType?: KeyboardTypeOptions;
  /** 最外层view的样式 */
  style?: StyleProp<ViewStyle>;
  /** input框的样式 */
  inputStyle?: StyleProp<TextStyle>;
  /** 输入改变时的回调 */
  onChange?: (text: string) => void;
  /** 提交时的搜索 */
  onSearch?: (text: string) => void;
  /** 取消按钮按下时的不透明度 */
  activeOpacity?: number;
}>;

const SearchBar: FC<SearchBarProps> = props => {
  const {
    placeholder = '搜索',
    showCancelButton = true,
    allowClear = true,
    disabled = false,
    defaultValue,
    autoFocus = false,
    cancelText = '取消',
    returnKeyType = 'search',
    keyboardType = 'default',
    style,
    inputStyle,
    onChange,
    onSearch,
    children,
    activeOpacity = 0.6,
  } = props;

  const theme = useTheme<Theme>();
  const { inputRef, focused, keywords, onFocus, onBlur, onCancel, setKeywords } = useSearchBar({
    autoFocus,
    defaultValue,
    onChange,
    onSearch,
  });

  const styles = StyleSheet.create({
    container: {
      overflow: 'hidden',
      paddingVertical: theme.spacing.x1,
      backgroundColor: theme.colors.gray50,
    },
    textInput: {
      flex: 1,
      textAlign: 'left',
      borderBottomWidth: 0,
    },
  });

  const CancelBtn = useMemo(() => {
    if (!showCancelButton || !focused) return null;
    return (
      <Pressable
        onPress={onCancel}
        activeOpacity={activeOpacity}
        style={{
          marginLeft: allowClear ? 0 : theme.spacing.x1,
          marginRight: theme.spacing.x1,
        }}
      >
        <Text variant="p0" color="primary200">
          {cancelText}
        </Text>
      </Pressable>
    );
  }, [showCancelButton, focused, activeOpacity, theme.spacing.x1, cancelText, onCancel, allowClear]);

  return (
    <Flex style={[styles.container, style]}>
      {!!children && (
        <Box
          justifyContent="center"
          alignItems="center"
          marginHorizontal={'x1'}
          borderRightWidth={ONE_PIXEL}
          borderRightColor={'gray500'}
        >
          {children}
        </Box>
      )}
      {/* 搜索小图标 */}
      <SvgIcon name="search" color={theme.colors.icon} style={{ marginHorizontal: theme.spacing.x1 }} />
      <InputItem
        ref={inputRef}
        style={styles.textInput}
        inputStyle={inputStyle}
        placeholder={placeholder}
        editable={!disabled}
        autoFocus={autoFocus}
        value={keywords}
        returnKeyType={returnKeyType}
        keyboardType={keyboardType}
        allowClear={allowClear}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={setKeywords}
        onSubmitEditing={e => onSearch?.(e.nativeEvent.text)}
        onClear={onCancel}
      />
      {/* 取消按钮 */}
      {CancelBtn}
    </Flex>
  );
};
SearchBar.displayName = 'SearchBar';

export default SearchBar;

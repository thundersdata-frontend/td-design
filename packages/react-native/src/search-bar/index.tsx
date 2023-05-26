import React, { FC, PropsWithChildren } from 'react';
import {
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import Flex from '../flex';
import helpers from '../helpers';
import SvgIcon from '../svg-icon';
import Text from '../text';
import { Theme } from '../theme';
import useSearchBar from './useSearchBar';

const { px } = helpers;
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
  /** 搜索框placeholder的位置 */
  placeholderPosition?: 'left' | 'center';
  /** 是否自动focus */
  autoFocus?: boolean;
  /** 取消文字 */
  cancelTitle?: string;
  /** 取消文字的宽度 */
  cancelWidth?: number;
  /** 键盘下方的按钮类型，默认为搜索 */
  returnKeyType?: ReturnKeyTypeOptions;
  /** 弹出键盘类型 */
  keyboardType?: KeyboardTypeOptions;
  /** 最外层view的样式 */
  containerStyle?: ViewStyle;
  /** 包裹input的view的样式 */
  inputContainerStyle?: ViewStyle;
  /** input框的样式 */
  inputStyle?: ViewStyle;
  /** 输入改变时的回调 */
  onChange?: (text: string) => void;
  /** 提交时的搜索 */
  onSearch?: (text: string) => void;
  /** 取消按钮按下时的不透明度 */
  activeOpacity?: number;
}>;

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const SearchBar: FC<SearchBarProps> = props => {
  const {
    placeholder = '搜索',
    showCancelButton = true,
    allowClear = true,
    disabled = false,
    defaultValue,
    placeholderPosition = 'left',
    autoFocus = false,
    cancelTitle = '取消',
    cancelWidth = 40,
    returnKeyType = 'search',
    keyboardType = 'default',
    containerStyle,
    inputContainerStyle,
    inputStyle,
    onChange,
    onSearch,
    children,
    activeOpacity = 0.5,
  } = props;

  const theme = useTheme<Theme>();
  const {
    keywords,
    inputRef,
    onFocus,
    onBlur,
    onCancel,
    onDelete,
    onChangeText,
    cancelBtnStyle,
    clearIconStyle,
    placeholderStyle,
    searchIconStyle,
  } = useSearchBar({
    placeholderPosition,
    cancelWidth,
    onChange,
    autoFocus,
    defaultValue,
  });

  const styles = StyleSheet.create({
    searchIcon: {
      position: 'absolute',
      width: px(30),
      height: px(30),
      justifyContent: 'center',
      alignItems: 'center',
    },
    clearIcon: {
      position: 'absolute',
      width: px(30),
      height: px(30),
      justifyContent: 'center',
      alignItems: 'center',
      right: 0,
    },
    cancel: {
      height: px(50),
      justifyContent: 'center',
      alignItems: 'center',
    },
    textInput: {
      flex: 1,
      height: px(40),
      paddingVertical: px(5),
      textAlign: 'left',
      borderRadius: theme.borderRadii.x1,
      backgroundColor: theme.colors.gray100,
      color: theme.colors.gray500,
      fontSize: px(14),
    },
  });

  const renderSearchIcon = () => {
    return (
      <AnimatedTouchable activeOpacity={1} onPress={onFocus} style={[styles.searchIcon, searchIconStyle]}>
        <SvgIcon name="search" color={theme.colors.icon} />
      </AnimatedTouchable>
    );
  };

  const renderClearBtn = () => {
    if (allowClear && !disabled) {
      return (
        <AnimatedTouchable activeOpacity={1} onPress={onDelete} style={[styles.clearIcon, clearIconStyle]}>
          <SvgIcon name="closecircleo" color={theme.colors.icon} />
        </AnimatedTouchable>
      );
    }
    return null;
  };

  const renderCancelBtn = () => {
    if (!showCancelButton) return null;
    return (
      <AnimatedTouchable activeOpacity={activeOpacity} onPress={onCancel} style={[styles.cancel, cancelBtnStyle]}>
        <Text variant="p0" color="primary200">
          {cancelTitle}
        </Text>
      </AnimatedTouchable>
    );
  };

  return (
    <Flex
      paddingHorizontal="x3"
      paddingVertical="x2"
      backgroundColor="background"
      height={px(50)}
      style={containerStyle}
    >
      {!!children && (
        <Box justifyContent="space-between" alignItems="center" height={px(40)} backgroundColor="gray100" padding="x1">
          {children}
        </Box>
      )}
      <Flex flex={1} marginLeft={!!children ? 'x1' : 'x0'} style={inputContainerStyle}>
        <Flex flex={1} flexGrow={1}>
          <AnimatedTextInput
            ref={inputRef}
            style={[styles.textInput, inputStyle, placeholderStyle]}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.gray300}
            editable={!disabled}
            defaultValue={defaultValue}
            autoFocus={autoFocus}
            value={keywords}
            underlineColorAndroid="transparent"
            autoCorrect={false}
            returnKeyType={returnKeyType}
            keyboardType={keyboardType}
            onFocus={onFocus}
            onBlur={onBlur}
            onChangeText={onChangeText}
            onSubmitEditing={() => onSearch?.(keywords)}
          />
          {/* 搜索小图标 */}
          {renderSearchIcon()}

          {/* 清除按钮 */}
          {renderClearBtn()}
        </Flex>

        {/* 取消按钮 */}
        {renderCancelBtn()}
      </Flex>
    </Flex>
  );
};
SearchBar.displayName = 'SearchBar';

export default SearchBar;

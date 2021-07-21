import React, { FC, useEffect, useRef, useState } from 'react';
import { TextInput, TouchableOpacity, ReturnKeyTypeOptions, KeyboardTypeOptions, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useTheme } from '@shopify/restyle';
import helpers from '../helpers';
import Iconfont from '../iconfont';
import Text from '../text';
import Flex from '../flex';
import { Theme } from '../theme';
import Box from '../box';

const { deviceWidth, px } = helpers;
interface SearchBarProps {
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
  /** 输入改变时的回调 */
  onChange?: (text: string) => void;
  /** 提交时的搜索 */
  onSearch?: (text: string) => void;
}

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
    onChange,
    onSearch,
    children,
  } = props;

  const middleWidth = (deviceWidth - px(24)) / 2;
  const theme = useTheme<Theme>();
  const inputRef = useRef<TextInput>(null);
  const [keywords, setKeywords] = useState<string>('');

  const focused = useSharedValue(0);

  useEffect(() => {
    if (inputRef.current && autoFocus) {
      inputRef.current.focus();
      focused.value = 1;
    }
  }, [autoFocus, focused]);

  useEffect(() => {
    if (defaultValue) {
      setKeywords(defaultValue);
    }
  }, [defaultValue]);

  /** 聚焦 */
  const onFocus = () => {
    inputRef.current?.focus();
    focused.value = 1;
  };

  /** 失焦 */
  const onBlur = () => {
    focused.value = 0;
  };

  /** 取消 */
  const onCancel = () => {
    setKeywords('');
    inputRef.current?.blur();
    focused.value = 0;
  };

  /** 输入 */
  const onChangeText = (text: string) => {
    setKeywords(text);
    onChange?.(text);
  };

  /** 删除 */
  const onDelete = () => {
    setKeywords('');
  };

  const cancelBtnStyle = useAnimatedStyle(() => {
    return {
      width: !!focused.value ? cancelWidth : 0,
      opacity: !!focused.value ? withTiming(1) : withTiming(0),
    };
  });

  const clearIconStyle = useAnimatedStyle(() => {
    const display = keywords.length > 0 && !!focused.value;
    return {
      opacity: display ? withTiming(1) : withTiming(0),
    };
  });

  const placeholderStyle = useAnimatedStyle(() => {
    return {
      paddingLeft: placeholderPosition === 'left' || !!focused.value ? withTiming(28) : withTiming(middleWidth - 10),
    };
  });

  const searchIconStyle = useAnimatedStyle(() => {
    return {
      left: placeholderPosition === 'left' || !!focused.value ? withTiming(4) : withTiming(middleWidth - 32),
    };
  });

  return (
    <Flex
      paddingHorizontal="x3"
      paddingVertical="x2"
      backgroundColor="background"
      height={px(50)}
      style={containerStyle}
    >
      {!!children && (
        <Box justifyContent="space-between" alignItems="center" height={px(32)} backgroundColor="gray100" padding="x1">
          {children}
        </Box>
      )}
      <Flex flex={1} style={[!!children && { marginLeft: theme.spacing.x1 }, inputContainerStyle]}>
        <Flex flex={1} flexGrow={1}>
          <AnimatedTextInput
            ref={inputRef}
            style={[
              {
                flex: 1,
                height: px(32),
                paddingVertical: px(5),
                textAlign: 'left',
                borderRadius: px(2),
                backgroundColor: theme.colors.gray100,
                color: theme.colors.gray500,
                fontSize: px(14),
              },
              placeholderStyle,
            ]}
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
          {/* search icon */}
          <AnimatedTouchable
            activeOpacity={0.5}
            onPress={onFocus}
            style={[
              {
                position: 'absolute',
              },
              searchIconStyle,
            ]}
          >
            <Iconfont name="search" color={theme.colors.icon} size={px(14)} />
          </AnimatedTouchable>

          {/* 清除按钮 */}
          {allowClear && !disabled && (
            <AnimatedTouchable
              activeOpacity={0.5}
              onPress={onDelete}
              style={[
                {
                  position: 'absolute',
                  width: px(30),
                  height: px(30),
                  justifyContent: 'center',
                  right: 0,
                },
                clearIconStyle,
              ]}
            >
              <Iconfont name="closecircleo" color={theme.colors.icon} size={px(14)} />
            </AnimatedTouchable>
          )}
        </Flex>

        {/* 取消文字 */}
        {showCancelButton && (
          <AnimatedTouchable
            activeOpacity={0.5}
            onPress={onCancel}
            style={[
              {
                height: px(50),
                justifyContent: 'center',
                alignItems: 'center',
              },
              cancelBtnStyle,
            ]}
          >
            <Text variant="p0" color="primary200">
              {cancelTitle}
            </Text>
          </AnimatedTouchable>
        )}
      </Flex>
    </Flex>
  );
};

export default SearchBar;

import React, { FC, useEffect, useRef, useState } from 'react';
import { deviceWidth, px } from '../helper';
import Icon from '../icon';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../config/theme';
import {
  TextInput,
  View,
  TouchableOpacity,
  Text,
  ReturnKeyTypeOptions,
  KeyboardTypeOptions,
  ViewStyle,
} from 'react-native';

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
    returnKeyType = 'search',
    keyboardType = 'default',
    containerStyle,
    inputContainerStyle,
    onChange,
    onSearch,
    children,
  } = props;

  const theme = useTheme<Theme>();
  const inputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);
  const [keyword, setKeyword] = useState<string>('');

  const middleWidth = (deviceWidth - px(24)) / 2;

  const { fontSize } = theme.textVariants.secondaryBody;

  useEffect(() => {
    if (inputRef.current && autoFocus) {
      inputRef.current.focus();
      setFocused(true);
    }
  }, [autoFocus]);

  useEffect(() => {
    if (defaultValue) {
      setKeyword(defaultValue);
    }
  }, [defaultValue]);

  /** 聚焦 */
  const onFocus = () => {
    inputRef.current?.focus();
    setFocused(true);
  };

  /** 失焦 */
  const onBlur = () => {
    setFocused(false);
  };

  /** 取消 */
  const onCancel = () => {
    setKeyword('');
    setFocused(false);
    inputRef.current?.blur();
  };

  /** 输入 */
  const onChangeText = (text: string) => {
    setKeyword(text);
    onChange?.(text);
  };

  /** 删除 */
  const onDelete = () => {
    setKeyword('');
  };

  return (
    <View
      style={[
        {
          backgroundColor: theme.colors.white,
          height: px(50),
          paddingHorizontal: px(12),
          justifyContent: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
        },
        containerStyle,
      ]}
    >
      {children}
      <View style={[{ flexDirection: 'row', alignItems: 'center', flex: 1 }, inputContainerStyle]}>
        <TextInput
          ref={inputRef}
          style={{
            flex: 1,
            height: px(30),
            paddingVertical: px(5),
            textAlign: 'left',
            borderRadius: px(2),
            // 30 = 12（左边留白12） + 14（搜索icon大小14） + 8（距离搜索icon的距离）
            paddingLeft: placeholderPosition === 'left' || focused ? px(34) : middleWidth + px(4),
            backgroundColor: theme.colors.tagBgColor,
            fontSize,
          }}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.closedTagColor}
          editable={!disabled}
          defaultValue={defaultValue}
          autoFocus={autoFocus}
          value={keyword}
          underlineColorAndroid="transparent"
          autoCorrect={false}
          returnKeyType={returnKeyType}
          keyboardType={keyboardType}
          onFocus={onFocus}
          onBlur={onBlur}
          onChangeText={onChangeText}
          onSubmitEditing={() => onSearch?.(keyword)}
        />
        {/* search icon */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onFocus}
          style={{
            position: 'absolute',
            left: placeholderPosition === 'left' || focused ? px(12) : middleWidth - px(14),
            justifyContent: 'center',
          }}
        >
          <Icon name="search1" color={theme.colors.closedTagColor} size={px(14)} />
        </TouchableOpacity>

        {/* 清除按钮 */}
        {allowClear && keyword.length > 0 && !disabled && focused && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onDelete}
            style={{
              position: 'absolute',
              right: showCancelButton ? px(40) : px(0),
              width: px(30),
              height: px(30),
              justifyContent: 'center',
            }}
          >
            <Icon name="closecircleo" color={theme.colors.closedTagColor} size={px(14)} />
          </TouchableOpacity>
        )}

        {/* 取消文字 */}
        {showCancelButton && focused && (
          <TouchableOpacity activeOpacity={0.8} onPress={onCancel} style={{ width: px(40) }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-end',
                backgroundColor: 'transparent',
              }}
            >
              <Text style={{ color: theme.colors.primaryColor, fontSize: px(12) }}>{cancelTitle}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SearchBar;

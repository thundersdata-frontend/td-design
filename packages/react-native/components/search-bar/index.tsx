import React, { FC, useEffect, useRef, useState } from 'react';
import { deviceWidth, px } from '../helper';
import Icon from '../icon';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../config/theme';
import {
  TextInput,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  ReturnKeyTypeOptions,
  KeyboardTypeOptions,
  ViewStyle,
} from 'react-native';

interface SearchBarProps {
  /** 搜索框的placeholder */
  placeholder?: string;
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
  containerStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
  onChange?: (text: string) => void;
  onSearch?: (text: string) => void;
}

const SearchBar: FC<SearchBarProps> = props => {
  const {
    placeholder = '搜索',
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
            paddingLeft: placeholderPosition === 'left' || focused ? px(12 + 14 + 4) : middleWidth + px(4),
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
        <TouchableWithoutFeedback onPress={onFocus}>
          <View
            style={{
              position: 'absolute',
              left: placeholderPosition === 'left' || focused ? px(12) : middleWidth - px(14),
            }}
          >
            <Icon name="search1" color={theme.colors.closedTagColor} size={px(14)} />
          </View>
        </TouchableWithoutFeedback>
        {keyword.length > 0 && !disabled && focused && (
          <TouchableWithoutFeedback onPress={onDelete}>
            <View
              style={{
                position: 'absolute',
                right: px(40 + 8),
              }}
            >
              <Icon name="closecircleo" color={theme.colors.closedTagColor} size={px(14)} />
            </View>
          </TouchableWithoutFeedback>
        )}
        {focused && (
          <TouchableOpacity onPress={onCancel} style={{ width: px(40) }}>
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

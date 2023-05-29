import { useEffect, useRef } from 'react';
import { Dimensions, TextInput } from 'react-native';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

import type { SearchBarProps } from '.';
import helpers from '../helpers';

const { deviceWidth, px } = helpers;
export default function useSearchBar({
  placeholderPosition,
  onChange,
  autoFocus = false,
  defaultValue = '',
}: Pick<SearchBarProps, 'placeholderPosition' | 'onChange' | 'autoFocus' | 'defaultValue'>) {
  const middleWidth = (deviceWidth - px(24)) / 2;
  const inputRef = useRef<TextInput>(null);
  const [keywords, setKeywords] = useSafeState(defaultValue);

  const focused = useSharedValue(0);
  /** 默认100是为了解决初始状态下取消按钮闪现的问题 */
  const cancelWidth = useSharedValue(100);

  const screenWidth = Dimensions.get('screen').width;

  useEffect(() => {
    if (inputRef.current && autoFocus) {
      inputRef.current.focus();
      focused.value = 1;
    }
  }, [autoFocus]);

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
    focused.value = 0;
    inputRef.current?.blur();
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

  /** 左边部分样式 */
  const leftBlockStyle = useAnimatedStyle(() => {
    return {
      // 24是左右留白x3的宽度
      width: !!focused.value ? withTiming(screenWidth - 24 - cancelWidth.value) : withTiming(screenWidth - 24),
    };
  });

  /** 取消按钮样式 */
  const cancelBtnStyle = useAnimatedStyle(() => {
    return {
      right: !!focused.value ? withTiming(0) : withTiming(-cancelWidth.value),
    };
  });

  /** 清除按钮样式 */
  const clearIconStyle = useAnimatedStyle(() => {
    const display = keywords.length > 0 && !!focused.value;
    return {
      width: display ? withTiming(30) : withTiming(0),
    };
  });

  const placeholderStyle = useAnimatedStyle(() => {
    return {
      paddingLeft: placeholderPosition === 'left' || !!focused.value ? withTiming(28) : withTiming(middleWidth - 10),
    };
  });

  /** 搜索icon样式 */
  const searchIconStyle = useAnimatedStyle(() => {
    return {
      left: placeholderPosition === 'left' || !!focused.value ? withTiming(4) : withTiming(middleWidth - 32),
    };
  });

  return {
    keywords,
    cancelWidth,
    onFocus: useMemoizedFn(onFocus),
    onBlur: useMemoizedFn(onBlur),
    onCancel: useMemoizedFn(onCancel),
    onChangeText: useMemoizedFn(onChangeText),
    onDelete: useMemoizedFn(onDelete),
    inputRef,
    cancelBtnStyle,
    clearIconStyle,
    placeholderStyle,
    searchIconStyle,
    leftBlockStyle,
  };
}

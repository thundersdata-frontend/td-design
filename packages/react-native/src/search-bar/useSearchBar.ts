import { useLatest, useMemoizedFn, useSafeState, useUpdateEffect } from '@td-design/rn-hooks';
import { useRef } from 'react';
import { TextInput } from 'react-native';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import type { SearchBarProps } from '.';
import helpers from '../helpers';

const { deviceWidth, px } = helpers;
export default function useSearchBar({
  placeholderPosition,
  cancelWidth,
  onChange,
  autoFocus = false,
  defaultValue = '',
}: Pick<SearchBarProps, 'placeholderPosition' | 'cancelWidth' | 'onChange' | 'autoFocus' | 'defaultValue'>) {
  const middleWidth = (deviceWidth - px(24)) / 2;
  const inputRef = useRef<TextInput>(null);
  const onChangeRef = useLatest(onChange);
  const [keywords, setKeywords] = useSafeState(defaultValue);

  const focused = useSharedValue(0);

  useUpdateEffect(() => {
    if (inputRef.current && autoFocus) {
      inputRef.current.focus();
      focused.value = 1;
    }
  }, [autoFocus, focused]);

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
    onChangeRef.current?.(text);
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
  }, [focused.value]);

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

  return {
    keywords,
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
  };
}

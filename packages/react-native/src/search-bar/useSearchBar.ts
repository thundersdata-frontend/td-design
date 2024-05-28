import { useEffect, useRef } from 'react';
import { TextInput } from 'react-native';

import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

import type { SearchBarProps } from '.';

export default function useSearchBar({
  autoFocus = false,
  defaultValue,
  onChange,
  onSearch,
}: Pick<SearchBarProps, 'autoFocus' | 'onChange' | 'defaultValue' | 'onSearch'>) {
  const inputRef = useRef<TextInput>(null);

  const [keywords, setKeywords] = useSafeState<string>();
  const [focused, setFocused] = useSafeState(autoFocus);

  useEffect(() => {
    setKeywords(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
      setFocused(true);
    }
  }, [autoFocus]);

  /** 聚焦 */
  const onFocus = () => {
    setFocused(true);
    inputRef.current?.focus();
  };

  /** 失焦 */
  const onBlur = () => {
    setFocused(false);
    inputRef.current?.blur();
  };

  const onCancel = () => {
    inputRef.current?.clear();
    inputRef.current?.blur();
    setFocused(false);
    setKeywords('');
    onChange?.('');
    onSearch?.('');
  };

  return {
    onFocus: useMemoizedFn(onFocus),
    onBlur: useMemoizedFn(onBlur),
    onCancel: useMemoizedFn(onCancel),
    setKeywords,
    inputRef,
    focused,
    keywords,
  };
}

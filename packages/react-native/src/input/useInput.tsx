import React, { useEffect, useMemo } from 'react';
import { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

import type { InputProps } from '.';
import Flex from '../flex';
import { px } from '../helpers/normalize';
import Text from '../text';

export default function useInput({
  inputType,
  labelPosition,
  label,
  value,
  onChange,
  onClear,
  colon = false,
  required = false,
}: Pick<
  InputProps,
  'inputType' | 'labelPosition' | 'label' | 'value' | 'onChange' | 'onClear' | 'colon' | 'required'
>) {
  const [inputValue, setInputValue] = useSafeState(value);
  const [eyeOpen, setEyeOpen] = useSafeState(inputType === 'password');

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputClear = () => {
    setInputValue('');
    onChange?.('');
    onClear?.();
  };

  const handleChange = (val: string) => {
    setInputValue(val);
    onChange?.(val);
  };

  const triggerPasswordType = () => {
    setEyeOpen(!eyeOpen);
  };

  const LabelComp = useMemo(() => {
    if (label) {
      if (typeof label === 'string') {
        return (
          <Flex marginRight="x2" alignItems="center" style={labelPosition === 'left' ? { height: px(40) } : {}}>
            {required && (
              <Text color="func600" marginRight={'x1'}>
                *
              </Text>
            )}
            <Text variant="p1" color="gray500">
              {label}
            </Text>
            <Text>{colon ? ':' : ''}</Text>
          </Flex>
        );
      }
      return (
        <Flex marginRight="x2" style={labelPosition === 'left' ? { height: px(40) } : {}}>
          {required && (
            <Text color="func600" marginRight={'x1'}>
              *
            </Text>
          )}
          {label}
          {colon ? ':' : ''}
        </Flex>
      );
    }
    return null;
  }, [colon, label, labelPosition, required]);

  const clearIconStyle = useAnimatedStyle(() => {
    return {
      width: !!inputValue ? withTiming(24) : withTiming(0),
    };
  });

  return {
    LabelComp,
    inputValue,
    eyeOpen,
    clearIconStyle,
    handleChange: useMemoizedFn(handleChange),
    handleInputClear: useMemoizedFn(handleInputClear),
    triggerPasswordType: useMemoizedFn(triggerPasswordType),
  };
}

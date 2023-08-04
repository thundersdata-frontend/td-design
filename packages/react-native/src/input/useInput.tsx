import React, { useEffect, useMemo } from 'react';

import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

import type { InputProps } from '.';
import Flex from '../flex';
import Text from '../text';

export default function useInput({
  inputType,
  labelPosition,
  label,
  value,
  defaultValue,
  onChange,
  onClear,
  colon = false,
  required = false,
}: Pick<
  InputProps,
  'inputType' | 'labelPosition' | 'label' | 'value' | 'defaultValue' | 'onChange' | 'onClear' | 'colon' | 'required'
>) {
  const [inputValue, setInputValue] = useSafeState<string>();
  const [eyeOpen, setEyeOpen] = useSafeState(inputType === 'password');

  useEffect(() => {
    setInputValue(value || defaultValue);
  }, [value, defaultValue]);

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
          <Flex marginRight="x2" alignItems="center">
            {required && <Text color="func600">*</Text>}
            <Text variant="p1" color="gray500">
              {label}
            </Text>
            <Text>{colon ? ':' : ''}</Text>
          </Flex>
        );
      }
      return (
        <Flex marginRight="x2">
          {required && <Text color="func600">*</Text>}
          {label}
          {colon ? ':' : ''}
        </Flex>
      );
    }
    return null;
  }, [colon, label, labelPosition, required]);

  return {
    LabelComp,
    inputValue,
    eyeOpen,
    handleChange: useMemoizedFn(handleChange),
    handleInputClear: useMemoizedFn(handleInputClear),
    triggerPasswordType: useMemoizedFn(triggerPasswordType),
  };
}

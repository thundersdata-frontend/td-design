import React, { useEffect, useMemo } from 'react';

import { useSafeState } from '@td-design/rn-hooks';

import Flex from '../flex';
import Text from '../text';
import type { TextAreaProps } from './TextArea';

export default function useTextArea({
  value = '',
  onChange,
  label,
  required = false,
}: Pick<TextAreaProps, 'value' | 'onChange' | 'label' | 'required'>) {
  const [inputValue, setInputValue] = useSafeState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (val: string) => {
    setInputValue(val);
    onChange?.(val);
  };

  const LabelComp = useMemo(() => {
    if (label) {
      if (typeof label === 'string') {
        return (
          <Flex alignItems={'center'}>
            {required && <Text color="func600">*</Text>}
            <Text variant="p1" color="gray500">
              {label}
            </Text>
          </Flex>
        );
      }
      return (
        <Flex alignItems={'center'}>
          {required && <Text color="func600">*</Text>}
          {label}
        </Flex>
      );
    }
    return null;
  }, [label, required]);

  return {
    inputValue,
    handleChange,
    LabelComp,
  };
}

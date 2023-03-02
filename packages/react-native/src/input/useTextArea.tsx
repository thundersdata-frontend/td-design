import React, { useMemo } from 'react';

import { useLatest, useSafeState, useUpdateEffect } from '@td-design/rn-hooks';

import Flex from '../flex';
import helpers from '../helpers';
import Text from '../text';
import type { TextAreaProps } from './TextArea';

const { px } = helpers;
export default function useTextArea({
  value = '',
  onChange,
  label,
  required = false,
}: Pick<TextAreaProps, 'value' | 'onChange' | 'label' | 'required'>) {
  const [inputValue, setInputValue] = useSafeState(value);
  const onChangeRef = useLatest(onChange);

  useUpdateEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (val: string) => {
    setInputValue(val);
    onChangeRef.current?.(val);
  };

  const LabelComp = useMemo(() => {
    if (label) {
      if (typeof label === 'string') {
        return (
          <Flex marginRight="x3" height={px(40)}>
            {required && (
              <Text color="func600" marginRight={'x1'}>
                *
              </Text>
            )}
            <Text variant="p1" color="gray500">
              {label}
            </Text>
          </Flex>
        );
      }
      return (
        <Flex marginRight="x3" height={px(40)}>
          {required && (
            <Text color="func600" marginRight={'x1'}>
              *
            </Text>
          )}
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

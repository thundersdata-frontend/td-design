import React from 'react';
import { useSafeState, useUpdateEffect, useCreation, useLatest } from '@td-design/rn-hooks';

import type { TextAreaProps } from './TextArea';
import Box from '../box';
import Text from '../text';
import helpers from '../helpers';

const { px } = helpers;
export default function useTextArea({
  value = '',
  onChange,
  label,
  labelStyle,
}: Pick<TextAreaProps, 'value' | 'onChange' | 'label' | 'labelStyle'>) {
  const [inputValue, setInputValue] = useSafeState(value);
  const onChangeRef = useLatest(onChange);

  useUpdateEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (val: string) => {
    setInputValue(val);
    onChangeRef.current?.(val);
  };

  const LabelComp = useCreation(() => {
    if (label) {
      if (typeof label === 'string') {
        return (
          <Box marginRight="x3">
            <Text variant="p0" color="gray500" lineHeight={px(25)} style={labelStyle}>
              {label}
            </Text>
          </Box>
        );
      }
      return <Box marginRight="x3">{label}</Box>;
    }
    return null;
  }, [label, labelStyle]);

  return {
    inputValue,
    handleChange,
    LabelComp,
  };
}

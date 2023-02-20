import { useEffect } from 'react';

import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

import type { RadioProps, RadioStatus, TransformedOption } from './type';

export default function useRadio({
  value,
  options,
  disabledValue,
  defaultValue,
  onChange,
}: Pick<RadioProps, 'value' | 'options' | 'disabledValue' | 'defaultValue' | 'onChange'>) {
  const [transformedOptions, setTransformedOptions] = useSafeState<TransformedOption[]>([]);

  useEffect(() => {
    const checkedValue = value ?? defaultValue;
    const newOptions: TransformedOption[] = options.map(option => {
      const checked = checkedValue === option.value;
      return {
        ...option,
        disabled: !!disabledValue?.includes(option.value),
        status: checked ? 'checked' : 'unchecked',
      };
    });
    setTransformedOptions(newOptions);
  }, [options, value, defaultValue, disabledValue]);

  /**
   * 1. 选中状态下，设置为未选中
   * 2. 未选中状态下，设置为选中
   */
  const handleChange = (value: string | number, status: RadioStatus) => {
    if (status === 'unchecked') {
      const newOptions: TransformedOption[] = transformedOptions.map(option => {
        if (option.disabled || option.value !== value)
          return {
            ...option,
            status: 'unchecked',
          };
        return {
          ...option,
          status: 'checked',
        };
      });
      setTransformedOptions(newOptions);
      onChange?.(value);
    }
  };

  return {
    transformedOptions,
    handleChange: useMemoizedFn(handleChange),
  };
}

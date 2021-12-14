import { useCreation, useMemoizedFn, useSafeState } from '@td-design/rn-hooks';
import { ReactText, useEffect } from 'react';

import type { RadioOption, RadioStatus, TransformedOption } from './type';

export default function useRadio({
  value,
  options = [],
  disabledValue = [],
  defaultCheckedValue,
  onChange,
}: {
  options: RadioOption[];
  value?: ReactText;
  disabledValue?: ReactText[];
  defaultCheckedValue?: ReactText;
  onChange?: (value: ReactText) => void;
}) {
  const [transformedOptions, setTransformedOptions] = useSafeState<TransformedOption[]>([]);

  const checkedValue = useCreation(() => value ?? defaultCheckedValue, [value, defaultCheckedValue]);

  useEffect(() => {
    const newOptions: TransformedOption[] = options.map(option => {
      const checked = checkedValue === option.value;
      return {
        ...option,
        disabled: disabledValue.includes(option.value),
        status: checked ? 'checked' : 'unchecked',
      };
    });
    setTransformedOptions(newOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * 1. 选中状态下，设置为未选中
   * 2. 未选中状态下，设置为选中
   */
  const handleChange = (value: ReactText, status: RadioStatus) => {
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

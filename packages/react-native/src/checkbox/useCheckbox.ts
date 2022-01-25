import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';
import { ReactText, useEffect } from 'react';

import type { CheckboxOption, CheckboxStatus, TransformedOption } from './type';

export default function useCheckbox({
  value,
  options = [],
  disabledValue = [],
  defaultCheckedValue,
  onChange,
  showCheckAll,
}: {
  options: CheckboxOption[];
  value?: ReactText[];
  disabledValue?: ReactText[];
  defaultCheckedValue?: ReactText[];
  onChange?: (value: ReactText[]) => void;
  showCheckAll: boolean;
}) {
  const [checkedAllStatus, setCheckedAllStatus] = useSafeState<CheckboxStatus>('unchecked');
  const [transformedOptions, setTransformedOptions] = useSafeState<TransformedOption[]>([]);
  const [checkedValue, setCheckedValue] = useSafeState<ReactText[] | undefined>(value ?? defaultCheckedValue);

  useEffect(() => {
    if (showCheckAll) {
      const checkedAllStatus = getCheckedAllStatus(options, checkedValue);
      setCheckedAllStatus(checkedAllStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedValue, options, showCheckAll]);

  useEffect(() => {
    const newOptions: TransformedOption[] = options.map(option => {
      const checked = checkedValue?.includes(option.value);
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
   * 1. 选中或者办选中状态下，设置为未选中
   * 2. 未选中状态下，设置为选中
   */
  const handleAllChange = (_: ReactText, status: CheckboxStatus) => {
    if (status === 'checked' || status === 'halfchecked') {
      setCheckedAllStatus('unchecked');
      const newOptions: TransformedOption[] = transformedOptions.map(option => {
        return {
          ...option,
          status: 'unchecked',
        };
      });
      setTransformedOptions(newOptions);
      setCheckedValue(undefined);
      onChange?.([]);
    } else {
      if (transformedOptions.some(item => item.disabled)) {
        setCheckedAllStatus('halfchecked');
      } else {
        setCheckedAllStatus('checked');
      }
      const checkedValue: ReactText[] = [];
      const newOptions: TransformedOption[] = transformedOptions.map(option => {
        if (option.disabled) return option;
        checkedValue.push(option.value);
        return {
          ...option,
          status: 'checked',
        };
      });
      setTransformedOptions(newOptions);
      setCheckedValue(checkedValue);
      onChange?.(checkedValue);
    }
  };

  /**
   * 1. 选中状态下，设置为未选中
   * 2. 未选中状态下，设置为选中
   */
  const handleChange = (value: ReactText, status: CheckboxStatus) => {
    let newOptions: TransformedOption[] = [];
    const newValue: ReactText[] = checkedValue ? [...checkedValue] : [];

    if (status === 'checked') {
      const index = newValue.findIndex(item => item === value);
      newValue.splice(index, 1);
      newOptions = transformedOptions.map(option => {
        if (option.disabled || option.value !== value) return option;
        return {
          ...option,
          status: 'unchecked',
        };
      });
    } else {
      newValue.push(value);
      newOptions = transformedOptions.map(option => {
        if (option.disabled || option.value !== value) return option;
        return {
          ...option,
          status: 'checked',
        };
      });
    }
    if (showCheckAll) {
      const checkedAllStatus = getCheckedAllStatus(newOptions, newValue);
      setCheckedAllStatus(checkedAllStatus);
    }
    setTransformedOptions(newOptions);
    setCheckedValue(newValue);
    onChange?.(newValue);
  };

  return {
    transformedOptions,
    checkedAllStatus,

    handleAllChange: useMemoizedFn(handleAllChange),
    handleChange: useMemoizedFn(handleChange),
  };
}

function getCheckedAllStatus<T extends { value: ReactText }>(options: T[] = [], checkedValue: ReactText[] = []) {
  if (checkedValue.length === 0) return 'unchecked';

  let checkedLength = 0;
  options.forEach(option => {
    const checked = checkedValue?.includes(option.value);
    if (checked) checkedLength++;
  });

  if (checkedLength === 0) {
    return 'unchecked';
  } else if (checkedLength === options.length) {
    return 'checked';
  } else {
    return 'halfchecked';
  }
}

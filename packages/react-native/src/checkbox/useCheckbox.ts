import { useEffect, useState } from 'react';

import { useMemoizedFn } from '@td-design/rn-hooks';

import type { CheckboxProps, CheckboxStatus, TransformedOption } from './type';

export default function useCheckbox(
  props: Pick<CheckboxProps, 'value' | 'options' | 'disabledValue' | 'defaultValue' | 'onChange' | 'showCheckAll'>
) {
  const { value, options, disabledValue, defaultValue, onChange, showCheckAll } = props;

  const [transformedOptions, setTransformedOptions] = useState<TransformedOption[]>([]);

  useEffect(() => {
    const checkedValue = value ?? defaultValue ?? [];
    const newOptions: TransformedOption[] = options.map(option => {
      const disabled = !!disabledValue?.includes(option.value);
      const checked = !!checkedValue?.includes(option.value);
      return {
        ...option,
        disabled,
        status: checked ? 'checked' : 'unchecked',
      };
    });
    setTransformedOptions(newOptions);
  }, [options, value, defaultValue, disabledValue]);

  let checkedAllStatus: CheckboxStatus = 'unchecked';
  if (showCheckAll) {
    checkedAllStatus = getCheckedAllStatus(transformedOptions);
  }

  /**
   * 1. 选中或者办选中状态下，设置为未选中
   * 2. 未选中状态下，设置为选中
   */
  const handleAllChange = (_: string | number, status: CheckboxStatus) => {
    if (status === 'checked') {
      const newOptions: TransformedOption[] = transformedOptions.map(option => {
        return {
          ...option,
          disabled: !!disabledValue?.includes(option.value),
          status: 'unchecked',
        };
      });
      if (onChange) {
        onChange([]);
      } else {
        setTransformedOptions(newOptions);
      }
    } else {
      const newOptions: TransformedOption[] = transformedOptions.map(option => {
        const disabled = !!disabledValue?.includes(option.value);
        return {
          ...option,
          disabled,
          status: !disabled ? 'checked' : 'unchecked',
        };
      });
      if (onChange) {
        const values = newOptions.filter(item => !disabledValue?.includes(item.value)).map(option => option.value);
        onChange(values);
      } else {
        setTransformedOptions(newOptions);
      }
    }
  };

  /**
   * 1. 选中状态下，设置为未选中
   * 2. 未选中状态下，设置为选中
   */
  const handleChange = (value: string | number, status: CheckboxStatus) => {
    const newOptions = transformedOptions.map(item => {
      if (item.value === value) {
        item.status = status === 'checked' ? 'unchecked' : 'checked';
      }
      return item;
    });
    if (onChange) {
      const values = newOptions.filter(item => item.status === 'checked').map(item => item.value);
      onChange(values);
    } else {
      setTransformedOptions(newOptions);
    }
  };

  return {
    transformedOptions,
    checkedAllStatus,

    handleAllChange: useMemoizedFn(handleAllChange),
    handleChange: useMemoizedFn(handleChange),
  };
}

function getCheckedAllStatus<T extends TransformedOption>(options: T[] = []) {
  const checkedLength = options.filter(option => option.status === 'checked').length;

  if (checkedLength === 0) {
    return 'unchecked';
  } else if (checkedLength === options.length) {
    return 'checked';
  } else {
    return 'halfchecked';
  }
}

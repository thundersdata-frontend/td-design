import { useLatest, useMemoizedFn } from '@td-design/rn-hooks';
import { ReactText, useMemo, useRef } from 'react';

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
  const onChangeRef = useLatest(onChange);
  const optionsRef = useRef(options);

  const checkedValue = useMemo(() => value ?? defaultCheckedValue, [value, defaultCheckedValue]);

  const checkedAllStatus = useMemo(() => {
    if (showCheckAll) {
      const checkedAllStatus = getCheckedAllStatus(optionsRef.current, checkedValue);
      return checkedAllStatus;
    }
    return 'unchecked' as CheckboxStatus;
  }, [checkedValue, showCheckAll]);

  const transformedOptions = useMemo(() => {
    const newOptions: TransformedOption[] = optionsRef.current.map(option => {
      const checked = checkedValue?.includes(option.value);
      return {
        ...option,
        disabled: disabledValue.includes(option.value),
        status: checked ? 'checked' : 'unchecked',
      };
    });
    return newOptions;
  }, [checkedValue, disabledValue]);

  /**
   * 1. 选中或者办选中状态下，设置为未选中
   * 2. 未选中状态下，设置为选中
   */
  const handleAllChange = (_: ReactText, status: CheckboxStatus) => {
    if (status === 'checked' || status === 'halfchecked') {
      onChangeRef.current?.([]);
    } else {
      onChangeRef.current?.(optionsRef.current.map(option => option.value));
    }
  };

  /**
   * 1. 选中状态下，设置为未选中
   * 2. 未选中状态下，设置为选中
   */
  const handleChange = (value: ReactText, status: CheckboxStatus) => {
    const newValue: ReactText[] = checkedValue ? [...checkedValue] : [];

    if (status === 'checked') {
      const index = newValue.findIndex(item => item === value);
      newValue.splice(index, 1);
    } else {
      newValue.push(value);
    }
    onChangeRef.current?.(newValue);
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

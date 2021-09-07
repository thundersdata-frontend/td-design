import { useEffect, ReactText } from 'react';
import { useLatest, useSafeState, useCreation, useMemoizedFn } from '@td-design/rn-hooks';
import type { CheckableProps, CheckableOption } from '.';

export default function useCheckable({
  type,
  value = [],
  options = [],
  defaultValue = [],
  disabledValue = [],
  onChange,
}: Pick<CheckableProps, 'type' | 'value' | 'options' | 'defaultValue' | 'disabledValue' | 'onChange'>) {
  const [selectedValue, setSelectedValue] = useSafeState<ReactText[]>(defaultValue);
  const onChangeRef = useLatest(onChange);

  useEffect(() => {
    if (value.length > 0) {
      setSelectedValue(value => {
        if (value.length === options.length) {
          value.push('all');
        }
        return value;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.toString()]);

  const optionData = useCreation(
    () =>
      (options as CheckableOption[]).map(option => {
        if (typeof option === 'string') {
          return {
            label: option,
            value: option,
          };
        }
        if (typeof option === 'number') {
          return {
            label: '' + option,
            value: option,
          };
        }
        return option;
      }),
    [options]
  );

  const handleChange = (value: ReactText) => {
    let _value = selectedValue.slice();

    if (selectedValue.includes(value)) {
      if (value === 'all') {
        _value = [];
      } else {
        const index = _value.indexOf(value);
        _value.splice(index, 1);
      }
      // 如果有一个没有选中，取消全选
      if (_value.includes('all')) {
        _value.splice(_value.indexOf('all'), 1);
      }
    } else {
      if (type === 'radio') {
        _value.pop();
      }
      if (value === 'all') {
        _value = optionData.filter(option => !disabledValue.includes(option.value)).map(option => option.value);
      }
      _value.push(value);

      // 如果勾选到了所有选项，默认选中全选
      if (_value.length === options.length) {
        _value.push('all');
      }
    }
    setSelectedValue(_value);
    onChangeRef.current?.(_value.filter(item => item !== 'all'));
  };

  return {
    selectedValue,
    optionData,
    handleChange: useMemoizedFn(handleChange),
  };
}

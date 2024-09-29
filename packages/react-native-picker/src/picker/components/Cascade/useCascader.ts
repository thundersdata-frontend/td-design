import { useEffect, useMemo } from 'react';

import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';
import arrayTreeFilter from 'array-tree-filter';

import { CascadePickerItemProps, PickerData } from '../../../components/WheelPicker/type';
import { CascaderProps } from '../../type';

export default function useCascader<T>({
  data,
  cols = 3,
  value,
  onChange,
  onClose,
}: Pick<CascaderProps<T>, 'data' | 'cols' | 'value' | 'onChange' | 'onClose' | 'visible'>) {
  const [stateValue, setStateValue] = useSafeState<T[]>([]);

  useEffect(() => {
    const nextValue = generateNextValue(data, value, cols);
    setStateValue(nextValue);
  }, [data, value, cols]);

  const handleValueChange = (value: PickerData<T>, index: number) => {
    const newValue = [...stateValue];
    // 修改当前的值，然后把后面的值都清掉
    newValue[index] = value.value;
    newValue.length = index + 1;
    const nextValue = generateNextValue(data, newValue, cols);
    setStateValue(nextValue);
  };

  const handleOk = () => {
    onChange?.(stateValue);
    onClose?.();
  };

  const childrenTree = useMemo(() => {
    const childrenTree = arrayTreeFilter(data, (c, level) => {
      return c.value === stateValue[level];
    }).map(c => c.children);

    // in case the users data is async get when select change
    const needPad = cols - childrenTree.length;
    if (needPad > 0) {
      for (let i = 0; i < needPad; i++) {
        childrenTree.push([]);
      }
    }
    childrenTree.length = cols! - 1;
    childrenTree.unshift(data);

    return childrenTree;
  }, [data, stateValue, cols]);

  return {
    stateValue,
    childrenTree,

    handleValueChange: useMemoizedFn(handleValueChange),
    handleOk: useMemoizedFn(handleOk),
  };
}

function generateNextValue<T>(data: CascadePickerItemProps<T>[], value: T[] | undefined, cols: number) {
  let d = data;
  let level = 0;
  const nextValue: T[] = [];

  if (value && value.length) {
    do {
      const index = d.findIndex(item => item.value === value[level]);

      if (index < 0) {
        break;
      }

      nextValue[level] = value[level];
      level += 1;
      d = d[index].children || [];
    } while (d.length > 0);
  }

  for (let i = level; i < cols; i++) {
    if (d && d.length) {
      nextValue[i] = d[0].value!;
      d = d[0].children || [];
    } else {
      break;
    }
  }
  return nextValue;
}

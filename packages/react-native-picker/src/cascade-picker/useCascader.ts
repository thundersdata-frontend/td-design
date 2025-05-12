import { ForwardedRef, useImperativeHandle, useMemo } from 'react';

import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';
import arrayTreeFilter from 'array-tree-filter';

import { CascadePickerItemProps, PickerData } from '../components/WheelPicker/type';
import { CascaderProps, PickerRef } from '../type';

export default function useCascader({
  data,
  cols = 3,
  value,
  onChange,
  ref,
}: Pick<CascaderProps, 'data' | 'cols' | 'value' | 'onChange'> & {
  ref: ForwardedRef<PickerRef>;
}) {
  const [stateValue, setStateValue] = useSafeState<(string | number)[]>(generateNextValue(data, value, cols));
  const [visible, setVisible] = useSafeState(false);

  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true);
    },
    hide: () => {
      setVisible(false);
    },
  }));

  const handleValueChange = (value: PickerData<string | number>, index: number) => {
    const newValue = [...stateValue];
    // 修改当前的值，然后把后面的值都清掉
    newValue[index] = value.value;
    newValue.length = index + 1;
    const nextValue = generateNextValue(data, newValue, cols);
    setStateValue(nextValue);
  };

  const handleOk = () => {
    onChange?.(stateValue);
    setVisible(false);
  };

  const handleClose = () => {
    const nextValue = generateNextValue(data, value, cols);
    setStateValue(nextValue);
    setVisible(false);
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

    return childrenTree as CascadePickerItemProps<string | number>[][];
  }, [data, stateValue, cols]);

  return {
    stateValue,
    childrenTree,
    visible,
    handleValueChange: useMemoizedFn(handleValueChange),
    handleOk: useMemoizedFn(handleOk),
    handleClose: useMemoizedFn(handleClose),
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

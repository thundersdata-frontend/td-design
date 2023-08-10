import { useEffect, useMemo } from 'react';
import { BackHandler } from 'react-native';

import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';
import arrayTreeFilter from 'array-tree-filter';

import { CascadePickerItemProps, ItemValue } from '../../../components/WheelPicker/type';
import { CascaderProps } from '../../type';

export default function useCascader({
  data,
  cols = 3,
  value,
  onChange,
  onClose,
  visible,
}: Pick<CascaderProps, 'data' | 'cols' | 'value' | 'onChange' | 'onClose' | 'visible'>) {
  const [stateValue, setStateValue] = useSafeState<ItemValue[]>([]);

  useEffect(() => {
    const listener = BackHandler.addEventListener('hardwareBackPress', () => visible);

    return () => {
      listener.remove();
    };
  }, []);

  useEffect(() => {
    const nextValue = generateNextValue(data, value, cols);
    setStateValue(nextValue);
  }, [data, value, cols]);

  const handleValueChange = (value: ItemValue, index: number) => {
    const newValue = [...stateValue];
    // 修改当前的值，然后把后面的值都清掉
    newValue[index] = value + '';
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
      return c.value + '' === stateValue[level] + '';
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

const generateNextValue = (
  data: CascadePickerItemProps[],
  value: ItemValue[] | undefined,
  cols: number
): ItemValue[] => {
  let d = data;
  let level = 0;
  const nextValue: ItemValue[] = [];

  if (value && value.length) {
    do {
      const index = d.findIndex(item => item.value + '' === value[level] + '');

      if (index < 0) {
        break;
      }

      nextValue[level] = value[level] + '';
      level += 1;
      d = d[index].children || [];
    } while (d.length > 0);
  }

  for (let i = level; i < cols; i++) {
    if (d && d.length) {
      nextValue[i] = d[0].value! + '';
      d = d[0].children || [];
    } else {
      break;
    }
  }
  return nextValue;
};

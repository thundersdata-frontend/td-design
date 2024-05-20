import { useEffect, useMemo } from 'react';
import { BackHandler } from 'react-native';

import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';
import { isNil } from 'lodash-es';

import { CascadePickerItemProps, ItemValue } from '../../../components/WheelPicker/type';
import { ModalPickerProps, PickerProps } from '../../type';

const transform = (data: CascadePickerItemProps[] | Array<CascadePickerItemProps[]>) => {
  const item = data[0];
  if (!Array.isArray(item)) {
    return {
      pickerData: [
        (data as CascadePickerItemProps[]).map(item => ({
          ...item,
          value: String(item.value),
        })),
      ],
      initialValue: !isNil(item?.value) ? [String(item.value)] : [],
    };
  }
  return {
    pickerData: (data as Array<CascadePickerItemProps[]>).map(arr =>
      arr.map(item => ({ ...item, value: String(item.value) }))
    ),
    initialValue: (data as Array<CascadePickerItemProps[]>).map(ele => String(ele[0].value!)),
  };
};

function getValue(value?: ItemValue[], initialValue?: ItemValue[]) {
  if (isNil(value) || value.length === 0) return initialValue;
  return value;
}

export default function useNormalPicker({
  data,
  value,
  onChange,
  onClose,
  visible,
  displayType,
}: PickerProps & ModalPickerProps) {
  const { pickerData, initialValue } = useMemo(() => transform(data), [data]);
  const [selectedValue, selectValue] = useSafeState<ItemValue[] | undefined>(undefined);

  useEffect(() => {
    selectValue(getValue(value, initialValue));
  }, [value, initialValue]);

  /** 绑定物理返回键监听事件，如果当前picker是打开的，返回键作用是关闭picker，否则返回上一个界面 */
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => visible);
    return () => sub.remove();
  }, [visible]);

  const handleChange = (val: ItemValue) => {
    if (displayType === 'view') {
      onChange?.([val]);
    }
    selectValue([val]);
  };

  const handleClose = () => {
    selectValue(getValue(value, initialValue));
    onClose?.();
  };

  const handleOk = () => {
    onChange?.(selectedValue);
    onClose?.();
  };

  return {
    pickerData,
    selectedValue,
    handleChange: useMemoizedFn(handleChange),
    handleOk: useMemoizedFn(handleOk),
    handleClose: useMemoizedFn(handleClose),
  };
}

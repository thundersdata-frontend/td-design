import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useCreation, useLatest, useMemoizedFn } from '@td-design/rn-hooks';
import { useImmer } from 'use-immer';
import { CascadePickerItemProps, ItemValue, ModalPickerProps, PickerProps } from '../../type';

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
      initialValue: item?.value ? [String(item.value)] : [],
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
  if (!value || value.length === 0) return initialValue;
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
  const { pickerData, initialValue } = useCreation(() => transform(data), [data]);
  const [selectedValue, selectValue] = useImmer<ItemValue[] | undefined>(getValue(value, initialValue));
  const onChangeRef = useLatest(onChange);
  const onCloseRef = useLatest(onClose);

  useEffect(() => {
    selectValue(getValue(value, initialValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, initialValue]);

  /** 绑定物理返回键监听事件，如果当前picker是打开的，返回键作用是关闭picker，否则返回上一个界面 */
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => visible);
    return () => sub.remove();
  }, [visible]);

  const handleChange = (val: ItemValue, index: number) => {
    selectValue(draft => {
      if (!draft) {
        draft = [val];
      } else {
        draft[index] = val;
      }
      if (displayType === 'view') {
        onChangeRef.current?.(draft);
      }
    });
  };

  const handleClose = () => {
    selectValue(initialValue);
    onCloseRef.current?.();
  };

  const handleOk = () => {
    onChangeRef.current?.(selectedValue);
    onCloseRef.current?.();
  };

  return {
    pickerData,
    selectedValue,
    handleChange: useMemoizedFn(handleChange),
    handleOk: useMemoizedFn(handleOk),
    handleClose: useMemoizedFn(handleClose),
  };
}

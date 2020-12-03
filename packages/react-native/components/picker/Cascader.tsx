import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { useImmer } from 'use-immer';
import arrayTreeFilter from 'array-tree-filter';
import WheelCurvedPicker from './WheelCurvedPicker';
import { PickerProps, ItemValue, ModalPickerProps, CascadePickerItemProps } from './type';
import Flex from '../flex';
import Text from '../text';
import Modal from '../modal';
import { ONE_PIXEL, px } from '../helper';

const getValue = (data: CascadePickerItemProps[], value: ItemValue[], cols: number) => {
  let d = data;
  let level = 0;
  const nextValue: ItemValue[] = [];

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
      nextValue[i] = d[0].value;
      d = d[0].children || [];
    } else {
      break;
    }
  }
  return nextValue;
};

const Cascader: FC<Omit<PickerProps, 'data'> & { data: CascadePickerItemProps[] } & ModalPickerProps> = props => {
  const {
    title,
    displayType = 'modal',
    visible,
    onClose,
    cols = 3,
    data = [],
    style,
    value = [],
    onChange,
    ...restProps
  } = props;

  const [selectedValue, selectValue] = useImmer<ItemValue[]>([]);

  useEffect(() => {
    const val = getValue(data, value, cols);
    selectValue(draft => {
      draft.length = 0;
      draft.push(...val);
    });
  }, [data, value, cols, selectValue]);

  /**
   * 选择某一个picker之后
   * @param value
   * @param index
   */
  const handleChange = useCallback(
    (value: ItemValue, index: number) => {
      const newValue = [...selectedValue];
      newValue[index] = value;
      const val = getValue(data, newValue, cols);
      selectValue(draft => {
        draft.length = 0;
        draft.push(...val);
      });
    },
    [data, cols, selectValue, selectedValue]
  );

  const getCols = useMemo(() => {
    const result = arrayTreeFilter(data, (c, level) => {
      return c.value === selectedValue[level];
    }).map(c => c.children);

    const needPad = cols - result.length;
    if (needPad > 0) {
      for (let i = 0; i < needPad; i++) {
        result.push([]);
      }
    }
    result.length = cols - 1;
    result.unshift(data);
    return result.map((item: CascadePickerItemProps[] = [], index: number) => (
      <Flex.Item key={index}>
        <WheelCurvedPicker
          {...restProps}
          {...{ data: item, value: selectedValue[index] }}
          onChange={val => handleChange(val, index)}
          style={[{ height: px(220) }, style]}
        />
      </Flex.Item>
    ));
  }, [cols, data, handleChange, selectedValue, restProps, style]);

  const handleClose = () => {
    selectValue(draft => {
      draft.length = 0;
      draft = value;
    });
    if (onClose) {
      onClose();
    }
  };

  const handleOk = () => {
    if (onChange) {
      onChange(selectedValue);
    }
    if (onClose) {
      onClose();
    }
  };

  const PickerComp = <Flex>{getCols}</Flex>;

  if (displayType === 'modal') {
    return (
      <Modal visible={visible} onClose={handleClose}>
        <Flex height={px(50)} borderBottomWidth={ONE_PIXEL} borderBottomColor="borderColor">
          <Flex.Item alignItems="center">
            <TouchableOpacity activeOpacity={0.8} onPress={handleClose}>
              <Text variant="primaryTipReverse">取消</Text>
            </TouchableOpacity>
          </Flex.Item>
          <Flex.Item alignItems="center">
            <Text variant="primaryBody">{title}</Text>
          </Flex.Item>
          <Flex.Item alignItems="center">
            <TouchableOpacity activeOpacity={0.8} onPress={handleOk}>
              <Text variant="primaryTipReverse">确定</Text>
            </TouchableOpacity>
          </Flex.Item>
        </Flex>
        {PickerComp}
      </Modal>
    );
  }
  return PickerComp;
};

export default Cascader;

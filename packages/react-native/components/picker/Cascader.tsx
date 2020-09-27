import React, { FC } from 'react';
import { useTheme } from '@shopify/restyle';
import { TouchableOpacity } from 'react-native';
import { useImmer } from 'use-immer';
import arrayTreeFilter from 'array-tree-filter';
import WheelCurvedPicker from './WheelCurvedPicker';
import { Theme } from '../config/theme';
import { PickerProps, ItemValue, ModalPickerProps, CascadePickerItemProps } from './type';
import Flex from '../flex';
import Text from '../text';
import Modal from '../modal';
import { ONE_PIXEL, px } from '../helper';

const Cascader: FC<Omit<PickerProps, 'data'> & { data: CascadePickerItemProps[] } & ModalPickerProps> = props => {
  const theme = useTheme<Theme>();
  const {
    title,
    displayType = 'modal',
    visible,
    onClose,
    textColor = theme.colors.primaryTextColor,
    textSize = px(20),
    itemSpace = px(32),
    cols = 3,
    data = [],
    style,
    value = [],
    onChange,
    ...restProps
  } = props;

  const getValue = (data: CascadePickerItemProps[], value: ItemValue[]) => {
    let d = data;
    let level = 0;
    const nextValue = [];

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

  const [selectedValue, selectValue] = useImmer<ItemValue[]>(getValue(data, value));

  const getCols = () => {
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
          {...{ data: item, value: selectedValue[index], textColor, textSize, itemSpace }}
          onChange={val => handleChange(val, index)}
          style={[{ height: px(220) }, style]}
        />
      </Flex.Item>
    ));
  };

  const handleChange = (value: ItemValue, index: number) => {
    selectValue(draft => {
      draft[index] = value;
    });
    const result = arrayTreeFilter(data, (c, level) => {
      return level <= index && c.value === value;
    });
    const item = result[index];
    if (item && item.children && item.children.length > 0 && index + 1 < cols) {
      const first = item.children[0];
      selectValue(draft => {
        draft[index + 1] = first.value;
      });
    }
  };

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

  const PickerComp = <Flex>{getCols()}</Flex>;

  if (displayType === 'modal') {
    return (
      <Modal visible={visible} onClose={handleClose}>
        <Flex height={px(50)} borderBottomWidth={ONE_PIXEL} borderBottomColor="borderColor">
          <Flex.Item alignItems="center">
            <TouchableOpacity onPress={handleClose}>
              <Text variant="primaryTipReverse">取消</Text>
            </TouchableOpacity>
          </Flex.Item>
          <Flex.Item alignItems="center">
            <Text variant="primaryBody">{title}</Text>
          </Flex.Item>
          <Flex.Item alignItems="center">
            <TouchableOpacity onPress={handleOk}>
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

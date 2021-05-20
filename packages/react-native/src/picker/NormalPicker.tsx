import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { BackHandler, TouchableOpacity } from 'react-native';
import { useImmer } from 'use-immer';
import WheelPicker from './WheelPicker';
import { PickerProps, ItemValue, ModalPickerProps, CascadePickerItemProps, PickerRefProps } from './type';
import Flex from '../flex';
import Text from '../text';
import Modal from '../modal/Modal';
import helpers from '../helpers';

const { ONE_PIXEL, px } = helpers;
const NormalPicker = forwardRef<PickerRefProps, PickerProps & ModalPickerProps>((props, ref) => {
  const {
    title,
    displayType = 'modal',
    visible = false,
    onClose,
    data,
    style,
    value = [],
    onChange,
    ...restProps
  } = props;
  const { pickerData, initialValue } = transform(data);
  const [selectedValue, selectValue] = useImmer(!value || value.length === 0 ? initialValue : value);

  /** 绑定物理返回键监听事件，如果当前picker是打开的，返回键作用是关闭picker，否则返回上一个界面 */
  useEffect(() => {
    const backHandler = () => {
      if (visible) {
        onClose?.();
        return false;
      }
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', backHandler);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useImperativeHandle(ref, () => {
    return {
      getValue: () => {
        return {
          value: selectedValue,
        };
      },
    };
  });

  const handleChange = (val: ItemValue, index: number) => {
    selectValue(draft => {
      draft[index] = val;
      if (displayType === 'view') {
        onChange?.(draft);
      }
    });
  };

  const handleClose = () => {
    selectValue(draft => {
      draft.length = 0;
      draft = value;
    });
    onClose?.();
  };

  const handleOk = () => {
    onChange?.(selectedValue);
    onClose?.();
  };

  const PickerComp = (
    <Flex backgroundColor="picker_background">
      {pickerData.map((item, index) => (
        <Flex.Item key={index}>
          <WheelPicker
            {...restProps}
            {...{ data: item, value: selectedValue[index] }}
            onChange={val => handleChange(val, index)}
            style={[{ height: px(220) }, style]}
          />
        </Flex.Item>
      ))}
    </Flex>
  );

  if (displayType === 'modal') {
    return (
      <Modal visible={visible} onClose={handleClose}>
        <Flex
          height={px(50)}
          borderBottomWidth={ONE_PIXEL}
          borderBottomColor="picker_border_bottom"
          backgroundColor="picker_background"
          paddingHorizontal="m"
        >
          <Flex.Item alignItems="flex-start">
            <TouchableOpacity activeOpacity={0.8} onPress={handleClose}>
              <Text variant="hint2">取消</Text>
            </TouchableOpacity>
          </Flex.Item>
          <Flex.Item alignItems="center">
            <Text variant="content1">{title}</Text>
          </Flex.Item>
          <Flex.Item alignItems="flex-end">
            <TouchableOpacity activeOpacity={0.8} onPress={handleOk}>
              <Text variant="hint2">确定</Text>
            </TouchableOpacity>
          </Flex.Item>
        </Flex>
        {PickerComp}
      </Modal>
    );
  }
  return PickerComp;
});

/**
 * 将data格式统一成二维数组
 * @param data
 */
function transform(data: CascadePickerItemProps[] | Array<CascadePickerItemProps[]>) {
  const item = data[0];
  if (!Array.isArray(item)) {
    return {
      pickerData: [data as CascadePickerItemProps[]],
      initialValue: [item.value!],
    };
  }
  return {
    pickerData: data as Array<CascadePickerItemProps[]>,
    initialValue: (data as Array<CascadePickerItemProps[]>).map(ele => ele[0].value!),
  };
}

export default NormalPicker;

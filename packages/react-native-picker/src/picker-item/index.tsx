import React, { FC, useCallback, useState } from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';
import { Text, helpers } from '@td-design/react-native';

import Picker from '../picker';
import { ModalPickerProps, PickerProps, ItemValue } from '../picker/type';
import { transformValueToLabel } from '../utils';

interface PickerItemProps extends PickerProps, Omit<ModalPickerProps, 'visible'> {
  placeholder?: string;
}

const { px } = helpers;
const PickerItem: FC<PickerItemProps> = ({ placeholder = '请选择', cascade, value, data, onChange, ...restProps }) => {
  const [currentText, setCurrentText] = useState(placeholder);
  const [visible, setVisible] = useState(false);

  const handleChange = useCallback(
    (value?: ItemValue[]) => {
      const label = transformValueToLabel(data, value, cascade);
      setCurrentText(label ?? placeholder);
      onChange?.(value);
    },
    [cascade, data, onChange, placeholder]
  );

  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          Keyboard.dismiss();
          setVisible(true);
        }}
        activeOpacity={0.8}
        style={{ flex: 1, minHeight: px(32), justifyContent: 'center', alignItems: 'flex-end' }}
      >
        <Text variant="p1" color="gray300">
          {currentText}
        </Text>
      </TouchableOpacity>
      <Picker {...restProps} {...{ cascade, value, data, visible, onChange: handleChange, onClose: handleClose }} />
    </>
  );
};

export default PickerItem;

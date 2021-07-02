import React, { FC, useCallback, useState } from 'react';
import { useTheme } from '@shopify/restyle';
import { TouchableOpacity } from 'react-native';
import { Box, Text, helpers, Flex, Icon } from '@td-design/react-native';
import { ModalPickerProps, PickerProps, ItemValue } from '../picker/type';
import { transformValueToLabel } from '../utils';
import Picker from '../picker';

interface PickerFilterProps extends PickerProps, Omit<ModalPickerProps, 'visible'> {
  label: string;
  placeholder?: string;
}

const { px, ONE_PIXEL } = helpers;
const PickerFilter: FC<PickerFilterProps> = ({
  label,
  placeholder = '请选择',
  cascade,
  value,
  data,
  onChange,
  ...restProps
}) => {
  const theme = useTheme();

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
    <Box>
      <Flex marginRight="x2" marginBottom="x1" alignItems="center">
        <Text variant="p0" color="gray500">
          {label}
        </Text>
      </Flex>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        activeOpacity={0.8}
        style={{
          height: px(40),
          paddingHorizontal: theme.spacing.x1,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          borderWidth: ONE_PIXEL,
          borderColor: theme.colors.border,
          borderRadius: theme.borderRadii.x1,
        }}
      >
        <Text variant="p1" color="gray300" marginLeft="x2">
          {currentText}
        </Text>
        <Icon name="down" size={px(16)} color={theme.colors.icon} />
      </TouchableOpacity>
      <Picker {...restProps} {...{ cascade, value, data, visible, onChange: handleChange, onClose: handleClose }} />
    </Box>
  );
};
export default PickerFilter;

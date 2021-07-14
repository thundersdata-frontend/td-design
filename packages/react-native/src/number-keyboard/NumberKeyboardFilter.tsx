import React, { FC, useCallback, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Text from '../text';
import Box from '../box';
import Flex from '../flex';
import helpers from '../helpers';
import NumberKeyboardModal from './NumberKeyboardModal';
import { NumberKeyboardFilterProps } from './type';
import { Theme } from '../theme';
import { useTheme } from '@shopify/restyle';
import { Toast } from '..';
import { formatValue } from './util';

const { px, ONE_PIXEL } = helpers;
const NumberKeyboardFilter: FC<NumberKeyboardFilterProps> = ({
  label,
  value,
  onChange,
  placeholder = '请输入',
  type,
  style,
  ...restProps
}) => {
  const theme = useTheme<Theme>();
  const [visible, setVisible] = useState(false);
  const [currentText, setCurrentText] = useState(placeholder);

  useEffect(() => {
    setCurrentText(value ? value + '' : placeholder);
  }, [value, placeholder]);

  /**
   * 根据type对value进行合法性校验
   */
  const handleSubmit = useCallback(
    (value: string) => {
      if (value.split('').filter(item => item === '.').length > 1) {
        Toast.fail({ content: '输入的数字格式不合法' });
        return;
      }
      const text = formatValue(value, type) + '';
      setCurrentText(`${text}` ?? placeholder);
      setVisible(false);
      onChange?.(`${text}`);
    },
    [onChange, placeholder, type]
  );

  return (
    <Box>
      <Flex marginRight="x2" marginBottom="x1" alignItems="center">
        <Text variant="p0" color="gray500">
          {label}
        </Text>
      </Flex>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setVisible(true)}
        style={[
          {
            height: px(40),
            paddingHorizontal: theme.spacing.x1,
            alignItems: 'center',
            flexDirection: 'row',
            borderWidth: ONE_PIXEL,
            borderColor: theme.colors.border,
            borderRadius: theme.borderRadii.x1,
          },
          style,
        ]}
      >
        <Text variant="p1" color="gray300" marginLeft="x2">
          {currentText}
        </Text>
      </TouchableOpacity>
      <NumberKeyboardModal
        {...restProps}
        type={type}
        value={currentText === placeholder ? '' : currentText}
        visible={visible}
        onClose={() => setVisible(false)}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default NumberKeyboardFilter;

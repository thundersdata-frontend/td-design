import React, { FC, useCallback, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Text from '../text';
import helpers from '../helpers';
import NumberKeyboardModal from './NumberKeyboardModal';
import { NumberKeyboardInputProps } from './type';
import { Theme } from '../theme';
import { useTheme } from '@shopify/restyle';

const { px } = helpers;
const NumberKeyboardInput: FC<NumberKeyboardInputProps> = ({
  value,
  onChange,
  placeholder = '请输入',
  ...restProps
}) => {
  const theme = useTheme<Theme>();
  const [visible, setVisible] = useState(false);
  const [currentText, setCurrentText] = useState(placeholder);

  useEffect(() => {
    setCurrentText(value ? value + '' : placeholder);
  }, [value, placeholder]);

  const handleSubmit = useCallback(
    (value: string) => {
      console.log(value);
      setCurrentText(value ?? placeholder);
      setVisible(false);
      onChange?.(value);
    },
    [onChange, placeholder]
  );

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setVisible(true)}
        style={{
          height: px(40),
          justifyContent: 'center',
          alignItems: 'flex-end',
          paddingHorizontal: theme.spacing.x4,
        }}
      >
        <Text variant="p0" color="gray300">
          {currentText}
        </Text>
      </TouchableOpacity>
      <NumberKeyboardModal
        {...restProps}
        value={currentText === placeholder ? '' : currentText}
        visible={visible}
        onClose={() => setVisible(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default NumberKeyboardInput;

import React, { FC, ReactNode, useState } from 'react';
import { useTheme } from '@shopify/restyle';
import { TextInput, TextInputProps } from 'react-native';
import { Theme } from '../theme';
import Text from '../text';
import Box from '../box';
import Flex from '../flex';
import helpers from '../helpers';

const { ONE_PIXEL, px } = helpers;
export interface TextAreaProps extends Omit<TextInputProps, 'placeholderTextColor' | 'onChange' | 'onChangeText'> {
  /** 标签 */
  label?: ReactNode;
  /** 值 */
  value?: string;
  /** 输入改变事件 */
  onChange?: (value: string) => void;
  /** 文本域高度 */
  height?: number;
  /** 文本长度限制 */
  limit?: number;
}

const TextArea: FC<TextAreaProps> = ({ label, height = px(150), limit, value = '', onChange, style, ...restProps }) => {
  const theme = useTheme<Theme>();
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (val: string) => {
    setInputValue(val);
    onChange?.(val);
  };

  let LabelComp = null;
  if (label) {
    if (typeof label === 'string') {
      LabelComp = (
        <Box marginRight="x3">
          <Text variant="p0" color="gray500" lineHeight={px(25)}>
            {label}
          </Text>
        </Box>
      );
    } else {
      LabelComp = <Box marginRight="x3">{label}</Box>;
    }
  }

  return (
    <Box>
      {LabelComp}
      <Box borderWidth={ONE_PIXEL} borderColor="border" paddingHorizontal="x1">
        <TextInput
          {...restProps}
          style={[
            style,
            {
              height,
              paddingLeft: theme.spacing.x1,
              fontSize: px(16),
              textAlignVertical: 'top',
              color: theme.colors.text,
            },
          ]}
          placeholderTextColor={theme.colors.gray300}
          value={inputValue}
          onChangeText={handleChange}
          multiline
          maxLength={limit}
        />
        {!!limit && (
          <Flex flexDirection="row-reverse" padding="x1">
            <Text variant="p1" color="gray300">
              {inputValue.length} / {limit}
            </Text>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default TextArea;

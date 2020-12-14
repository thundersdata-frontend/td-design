import React, { FC, ReactNode, useState } from 'react';
import { useTheme } from '@shopify/restyle';
import { TextInput, TextInputProps } from 'react-native';
import { Theme } from '../config/theme';
import Text from '../text';
import Box from '../box';
import Flex from '../flex';
import { ONE_PIXEL, px } from '../helper';

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
        <Box marginRight="m">
          <Text variant="primaryBody" lineHeight={px(25)}>
            {label}
          </Text>
        </Box>
      );
    } else {
      LabelComp = <Box marginRight="m">{label}</Box>;
    }
  }

  return (
    <Box>
      {LabelComp}
      <Box borderWidth={ONE_PIXEL} borderColor="borderColor" paddingHorizontal="xs">
        <TextInput
          {...restProps}
          style={[style, { height, paddingLeft: theme.spacing.xs, fontSize: px(16), textAlignVertical: 'top' }]}
          placeholderTextColor={theme.colors.secondaryTipColor}
          value={inputValue}
          onChangeText={handleChange}
          multiline
          maxLength={limit}
        />
        {!!limit && (
          <Flex flexDirection="row-reverse">
            <Text variant="secondaryDate">
              {inputValue.length} / {limit}
            </Text>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default TextArea;

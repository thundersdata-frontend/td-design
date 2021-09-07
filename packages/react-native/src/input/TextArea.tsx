import React, { FC, ReactNode } from 'react';
import { useTheme } from '@shopify/restyle';
import { TextInput, TextInputProps, TextStyle } from 'react-native';
import { Theme } from '../theme';
import Text from '../text';
import Box from '../box';
import Flex from '../flex';
import helpers from '../helpers';
import useTextArea from './useTextArea';

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
  /** 是否有边框 */
  border?: boolean;
  /** 标签样式 */
  labelStyle?: TextStyle;
}

const TextArea: FC<TextAreaProps> = ({
  label,
  height = px(150),
  limit,
  value = '',
  border = true,
  onChange,
  style,
  labelStyle,
  ...restProps
}) => {
  const theme = useTheme<Theme>();
  const { inputValue, handleChange, LabelComp } = useTextArea({ value, onChange, label, labelStyle });

  return (
    <Box>
      {LabelComp}
      <Box borderWidth={border ? ONE_PIXEL : 0} borderColor="border" paddingHorizontal="x1">
        <TextInput
          {...restProps}
          style={[
            {
              height,
              paddingLeft: theme.spacing.x1,
              fontSize: px(16),
              textAlignVertical: 'top',
              color: theme.colors.text,
            },
            style,
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

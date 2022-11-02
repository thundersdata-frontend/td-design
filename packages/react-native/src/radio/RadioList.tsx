import React, { FC } from 'react';
import Box from '../box';
import { px, ONE_PIXEL } from '../helpers/normalize';
import { RadioItem } from './RadioItem';
import useRadio from './useRadio';

import type { RadioProps } from './type';

export const RadioList: FC<RadioProps> = ({
  value,
  disabledValue = [],
  defaultCheckedValue,
  containerStyle,
  options = [],
  size = px(24),
  onChange,
  itemStyle,
  ...restProps
}) => {
  const { transformedOptions = [], handleChange } = useRadio({
    options,
    disabledValue,
    defaultCheckedValue,
    onChange,
    value,
  });

  return (
    <Box style={containerStyle}>
      {transformedOptions.map(option => {
        return (
          <Box
            key={option.value}
            style={itemStyle}
            height={px(50)}
            justifyContent="center"
            alignItems="flex-start"
            paddingLeft="x1"
            borderBottomWidth={ONE_PIXEL}
            borderBottomColor="border"
          >
            <RadioItem mode="list" {...option} size={size} onChange={handleChange} {...restProps} />
          </Box>
        );
      })}
    </Box>
  );
};

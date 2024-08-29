import React, { FC } from 'react';

import Box from '../box';
import { ONE_PIXEL, px } from '../helpers/normalize';
import RadioItem from './RadioItem';
import type { RadioProps } from './type';
import useRadio from './useRadio';

const RadioList: FC<RadioProps> = ({
  value,
  disabledValue,
  defaultValue,
  containerStyle,
  options,
  size = px(24),
  onChange,
  itemStyle,
  activeOpacity = 0.6,
  ...restProps
}) => {
  const { transformedOptions = [], handleChange } = useRadio({
    options,
    disabledValue,
    defaultValue,
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
          >
            <RadioItem
              mode="list"
              {...option}
              size={size}
              onChange={handleChange}
              {...{ activeOpacity }}
              {...restProps}
            />
            <Box width={'100%'} height={ONE_PIXEL} backgroundColor="border" />
          </Box>
        );
      })}
    </Box>
  );
};
RadioList.displayName = 'RadioList';

export default RadioList;

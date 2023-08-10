import React, { forwardRef } from 'react';

import Flex from '../flex';
import { px } from '../helpers/normalize';
import RadioItem from './RadioItem';
import RadioList from './RadioList';
import type { RadioProps } from './type';
import useRadio from './useRadio';

const Radio = forwardRef<unknown, RadioProps>(
  (
    {
      value,
      disabledValue,
      defaultValue,
      containerStyle,
      options,
      size = px(24),
      onChange,
      activeOpacity = 0.5,
      ...restProps
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _ref
  ) => {
    const { transformedOptions = [], handleChange } = useRadio({
      options,
      disabledValue,
      defaultValue,
      onChange,
      value,
    });

    return (
      <Flex flexWrap="wrap" style={containerStyle}>
        {transformedOptions.map((option, index, array) => {
          return (
            <RadioItem
              key={option.value}
              {...option}
              size={size}
              onChange={handleChange}
              isLast={index === array.length - 1}
              {...{ activeOpacity }}
              {...restProps}
            />
          );
        })}
      </Flex>
    );
  }
);
Radio.displayName = 'Radio';

export default Object.assign(Radio, { RadioList });

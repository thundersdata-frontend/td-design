import React, { forwardRef } from 'react';
import Flex from '../flex';
import { px } from '../helpers/normalize';
import useRadio from './useRadio';
import { RadioItem } from './RadioItem';
import { RadioList } from './RadioList';

import type { RadioProps } from './type';

const Radio = forwardRef<unknown, RadioProps>(
  (
    {
      value,
      disabledValue = [],
      defaultCheckedValue,
      containerStyle,
      options = [],
      size = px(24),
      onChange,
      ...restProps
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _ref
  ) => {
    const { transformedOptions = [], handleChange } = useRadio({
      options,
      disabledValue,
      defaultCheckedValue,
      onChange,
      value,
    });

    return (
      <Flex flexWrap="wrap" style={containerStyle}>
        {transformedOptions.map(option => {
          return <RadioItem key={option.value} {...option} size={size} onChange={handleChange} {...restProps} />;
        })}
      </Flex>
    );
  }
);

export default Object.assign(Radio, { RadioList });

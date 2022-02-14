import React, { forwardRef } from 'react';
import Flex from '../flex';
import { px } from '../helpers/normalize';
import useCheckbox from './useCheckbox';

import { CheckboxItem } from './CheckboxItem';
import { CheckboxList } from './CheckboxList';

import type { CheckboxProps } from './type';

const Checkbox = forwardRef<unknown, CheckboxProps>(
  (
    {
      value,
      disabledValue = [],
      defaultCheckedValue,
      containerStyle,
      options = [],
      showCheckAll = true,
      size = px(24),
      onChange,
      ...restProps
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _ref
  ) => {
    const {
      transformedOptions = [],
      checkedAllStatus,
      handleAllChange,
      handleChange,
    } = useCheckbox({ options, disabledValue, defaultCheckedValue, onChange, value, showCheckAll });

    return (
      <Flex flexWrap="wrap" style={containerStyle}>
        {showCheckAll && (
          <CheckboxItem
            disabled={false}
            label="全选"
            value="checkbox-select-all"
            status={checkedAllStatus}
            size={size}
            onChange={handleAllChange}
            {...restProps}
          />
        )}
        {transformedOptions.map(option => {
          return <CheckboxItem key={option.value} {...option} size={size} onChange={handleChange} {...restProps} />;
        })}
      </Flex>
    );
  }
);

export default Object.assign(Checkbox, { CheckboxList });

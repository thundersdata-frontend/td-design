import React, { forwardRef } from 'react';

import Flex from '../flex';
import { px } from '../helpers/normalize';
import CheckboxItem from './CheckboxItem';
import CheckboxList from './CheckboxList';
import type { CheckboxProps } from './type';
import useCheckbox from './useCheckbox';

const Checkbox = forwardRef<unknown, CheckboxProps>(
  (
    {
      value,
      disabledValue,
      defaultValue,
      containerStyle,
      options,
      showCheckAll = true,
      size = px(24),
      onChange,
      activeOpacity = 0.5,
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
    } = useCheckbox({
      options,
      disabledValue,
      defaultValue,
      onChange,
      value,
      showCheckAll,
    });

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
            {...{ activeOpacity }}
            {...restProps}
          />
        )}
        {transformedOptions.map((option, index, array) => {
          return (
            <CheckboxItem
              key={option.value}
              {...option}
              size={size}
              isLast={index === array.length - 1}
              onChange={handleChange}
              {...{ activeOpacity }}
              {...restProps}
            />
          );
        })}
      </Flex>
    );
  }
);
Checkbox.displayName = 'Checkbox';

export default Object.assign(Checkbox, { CheckboxList });

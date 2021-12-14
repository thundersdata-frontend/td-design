import React, { FC } from 'react';
import Flex from '../flex';
import { px } from '../helpers/normalize';
import useCheckbox from './useCheckbox';

import { CheckboxItem } from './CheckboxItem';
import { CheckboxList } from './CheckboxList';

import type { CheckboxProps } from './type';

const Checkbox: FC<CheckboxProps> = ({
  value,
  disabledValue = [],
  defaultCheckedValue,
  containerStyle,
  options = [],
  showCheckAll = true,
  size = px(24),
  onChange,
  ...restProps
}) => {
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
          key="checkbox-select-all"
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
};

export default Object.assign(Checkbox, { CheckboxList });

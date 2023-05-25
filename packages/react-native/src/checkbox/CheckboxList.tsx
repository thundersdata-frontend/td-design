import React, { FC } from 'react';

import Box from '../box';
import { ONE_PIXEL, px } from '../helpers/normalize';
import CheckboxItem from './CheckboxItem';
import type { CheckboxProps } from './type';
import useCheckbox from './useCheckbox';

const CheckboxList: FC<CheckboxProps> = ({
  value,
  disabledValue,
  defaultValue,
  containerStyle,
  options,
  showCheckAll = true,
  size = px(24),
  onChange,
  itemStyle,
  activeOpacity = 0.5,
  ...restProps
}) => {
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
    <Box style={containerStyle}>
      {showCheckAll && (
        <Box
          key="checkbox-select-all"
          style={itemStyle}
          height={px(50)}
          justifyContent="center"
          alignItems="flex-start"
          paddingLeft="x1"
          borderBottomWidth={ONE_PIXEL}
          borderBottomColor="border"
        >
          <CheckboxItem
            mode="list"
            disabled={false}
            label="全选"
            value="checkbox-select-all"
            status={checkedAllStatus}
            size={size}
            onChange={handleAllChange}
            {...{ activeOpacity }}
            {...restProps}
          />
        </Box>
      )}
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
            <CheckboxItem
              mode="list"
              {...option}
              size={size}
              onChange={handleChange}
              {...{ activeOpacity }}
              {...restProps}
            />
          </Box>
        );
      })}
    </Box>
  );
};
CheckboxList.displayName = 'CheckboxList';

export default CheckboxList;

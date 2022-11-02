import { composeRestyleFunctions, layout, LayoutProps, useRestyle, useTheme } from '@shopify/restyle';
import { useCounter, useLatest } from '@td-design/rn-hooks';
import React, { forwardRef } from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';

import Box from '../box';
import Flex from '../flex';
import helpers from '../helpers';
import Input from '../input';
import SvgIcon from '../svg-icon';
import { Theme } from '../theme';

const { ONE_PIXEL, px } = helpers;

export type StepperProps = Omit<LayoutProps<Theme>, 'width' | 'minWidth'> & {
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 默认值 */
  defaultValue?: number;
  /** 当前值 */
  value?: number;
  /** 修改事件 */
  onChange?: (value?: number) => void;
  /** 每次改变步数，可以为小数 */
  step?: number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 宽度 */
  width?: number;
  /** 是否显示清除图标 */
  allowClear?: boolean;
  /** 是否允许手动输入 */
  editable?: boolean;
};

const STEPPER_HEIGHT = px(32);
const Stepper = forwardRef<unknown, StepperProps>(
  (
    {
      min = Number.NEGATIVE_INFINITY,
      max = Number.POSITIVE_INFINITY,
      value,
      onChange,
      step = 1,
      width = px(200),
      defaultValue,
      disabled = false,
      allowClear = true,
      editable = true,
      ...layoutProps
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _
  ) => {
    const restyleFunctions = composeRestyleFunctions([layout]);

    const theme = useTheme<Theme>();
    const props = useRestyle(restyleFunctions as any, layoutProps);
    const onChangeRef = useLatest(onChange);
    const [current, { set, reset }] = useCounter(defaultValue ?? value, { min, max });

    const handleMinus = () => {
      Keyboard.dismiss();
      const value = +current - step;
      set(value);
      onChangeRef.current?.(value);
    };

    const handleAdd = () => {
      Keyboard.dismiss();
      const value = +current + step;
      set(value);
      onChangeRef.current?.(value);
    };

    const handleChange = (val: string) => {
      // 先校验是否是数字
      if (Number.isNaN(+val)) {
        reset();
        onChangeRef.current?.(defaultValue);
      } else {
        set(+val);
        onChangeRef.current?.(+val);
      }
    };

    return (
      <Flex {...props} width={width} minWidth={px(120)} height={STEPPER_HEIGHT}>
        <TouchableOpacity activeOpacity={0.5} onPress={handleMinus} disabled={disabled || +current - step < min}>
          <Box
            width={STEPPER_HEIGHT}
            height={STEPPER_HEIGHT}
            justifyContent="center"
            alignItems="center"
            borderWidth={ONE_PIXEL}
            borderColor="border"
            borderRadius="x1"
          >
            <SvgIcon name="minus" color={theme.colors.icon} size={px(22)} />
          </Box>
        </TouchableOpacity>
        <Box flex={1} minWidth={px(80)} paddingHorizontal="x1">
          <Input
            keyboardType="number-pad"
            value={String(current)}
            onChange={handleChange}
            disabled={disabled || !editable}
            {...{ allowClear }}
            inputStyle={{
              height: STEPPER_HEIGHT,
              textAlign: 'center',
            }}
          />
        </Box>
        <TouchableOpacity activeOpacity={0.5} onPress={handleAdd} disabled={disabled || +current + step > max}>
          <Box
            width={STEPPER_HEIGHT}
            height={STEPPER_HEIGHT}
            justifyContent="center"
            alignItems="center"
            borderWidth={ONE_PIXEL}
            borderColor="border"
            borderRadius="x1"
          >
            <SvgIcon name="plus" color={theme.colors.icon} size={px(22)} />
          </Box>
        </TouchableOpacity>
      </Flex>
    );
  }
);

export default Stepper;

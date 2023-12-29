import React, { forwardRef } from 'react';

import { composeRestyleFunctions, layout, useRestyle, useTheme } from '@shopify/restyle';

import Box from '../box';
import Flex from '../flex';
import helpers from '../helpers';
import Input from '../input';
import Pressable from '../pressable';
import SvgIcon from '../svg-icon';
import { Theme } from '../theme';
import useStepper, { StepperProps } from './useStepper';

const { ONE_PIXEL, px } = helpers;

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
      activeOpacity = 0.6,
      ...layoutProps
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _
  ) => {
    const restyleFunctions = composeRestyleFunctions([layout]);

    const theme = useTheme<Theme>();
    const props = useRestyle(restyleFunctions as any, layoutProps);
    const { current, handleAdd, handleMinus, handleChange } = useStepper({
      defaultValue,
      value,
      min,
      max,
      onChange,
      step,
    });

    return (
      <Flex {...props} width={width} minWidth={px(120)}>
        <Pressable activeOpacity={activeOpacity} onPress={handleMinus} disabled={disabled || +current - step < min}>
          <Box
            padding="x2"
            justifyContent="center"
            alignItems="center"
            borderWidth={ONE_PIXEL}
            borderColor="border"
            borderRadius="x1"
          >
            <SvgIcon name="minus" color={disabled ? theme.colors.disabled : theme.colors.gray500} />
          </Box>
        </Pressable>
        <Box flex={1} minWidth={px(80)} paddingHorizontal="x1">
          <Input
            keyboardType="number-pad"
            value={String(current)}
            onChange={handleChange}
            disabled={disabled || !editable}
            {...{ allowClear }}
            inputStyle={{
              textAlign: 'center',
            }}
          />
        </Box>
        <Pressable activeOpacity={activeOpacity} onPress={handleAdd} disabled={disabled || +current + step > max}>
          <Box
            padding="x2"
            justifyContent="center"
            alignItems="center"
            borderWidth={ONE_PIXEL}
            borderColor="border"
            borderRadius="x1"
          >
            <SvgIcon name="plus" color={disabled ? theme.colors.disabled : theme.colors.gray500} />
          </Box>
        </Pressable>
      </Flex>
    );
  }
);
Stepper.displayName = 'Stepper';

export default Stepper;

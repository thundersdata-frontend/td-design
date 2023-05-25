import React, { forwardRef } from 'react';
import { TouchableOpacity } from 'react-native';

import { composeRestyleFunctions, layout, useRestyle, useTheme } from '@shopify/restyle';

import Box from '../box';
import Flex from '../flex';
import helpers from '../helpers';
import Input from '../input';
import SvgIcon from '../svg-icon';
import { Theme } from '../theme';
import useStepper, { StepperProps } from './useStepper';

const { ONE_PIXEL, px } = helpers;

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
    const { current, handleAdd, handleMinus, handleChange } = useStepper({
      defaultValue,
      value,
      min,
      max,
      onChange,
      step,
    });

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
Stepper.displayName = 'Stepper';

export default Stepper;

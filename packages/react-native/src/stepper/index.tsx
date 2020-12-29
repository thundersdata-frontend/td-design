import React, { FC, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { layout, LayoutProps, useRestyle, useTheme } from '@shopify/restyle';
import { isNumber } from 'lodash-es';
import Input from '../input';
import Flex from '../flex';
import Box from '../box';
import { Theme } from '../config/theme';
import Icon from '../icon';
import { ONE_PIXEL, px } from '../helper';

type StepperProps = Omit<LayoutProps<Theme>, 'width' | 'minWidth'> & {
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 默认值 */
  defaultValue?: number | string;
  /** 当前值 */
  value?: number | string;
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

const STEPPER_HEIGHT = px(40);
const Stepper: FC<StepperProps> = ({
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
}) => {
  const theme = useTheme<Theme>();
  const props = useRestyle([layout], layoutProps);
  const [num, setNum] = useState(defaultValue ?? value ?? '');

  const handleMinus = () => {
    const value = +num - step;
    if (value >= min) {
      setNum(value);
      onChange?.(value);
    }
  };

  const handleAdd = () => {
    const value = +num + step;
    if (value <= max) {
      setNum(value);
      onChange?.(value);
    }
  };

  const handleChange = (val: string) => {
    // 先校验是否是数字
    if (!isNumber(+val)) {
      setNum('');
    } else if (+val >= min && +val <= max) {
      setNum(val);
      onChange?.(+val);
    }
  };

  return (
    <Flex {...props} width={width} minWidth={px(120)} height={STEPPER_HEIGHT}>
      <TouchableOpacity activeOpacity={0.8} onPress={handleMinus} disabled={disabled || Number(num) - step < min}>
        <Box
          width={STEPPER_HEIGHT}
          height={STEPPER_HEIGHT}
          justifyContent="center"
          alignItems="center"
          borderWidth={ONE_PIXEL}
          borderColor="borderColor"
          borderRadius="base"
        >
          <Icon name="minus" color={theme.colors.overlayColor} />
        </Box>
      </TouchableOpacity>
      <Box flex={1} paddingHorizontal="xs">
        <Input
          keyboardType="numbers-and-punctuation"
          value={`${num}`}
          onChange={handleChange}
          disabled={disabled || !editable}
          {...{ allowClear }}
          style={{ fontSize: px(16), textAlign: 'center', height: STEPPER_HEIGHT }}
        />
      </Box>
      <TouchableOpacity activeOpacity={0.8} onPress={handleAdd} disabled={disabled || Number(num) + step > max}>
        <Box
          width={STEPPER_HEIGHT}
          height={STEPPER_HEIGHT}
          justifyContent="center"
          alignItems="center"
          borderWidth={ONE_PIXEL}
          borderColor="borderColor"
          borderRadius="base"
        >
          <Icon name="plus" color={theme.colors.overlayColor} />
        </Box>
      </TouchableOpacity>
    </Flex>
  );
};

export default Stepper;

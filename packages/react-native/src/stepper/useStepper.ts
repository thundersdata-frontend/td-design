import { Keyboard } from 'react-native';

import { LayoutProps } from '@shopify/restyle';
import { useCounter, useMemoizedFn } from '@td-design/rn-hooks';

import { Theme } from '../theme';

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

export default function useStepper({
  defaultValue,
  value,
  min,
  max,
  onChange,
  step = 1,
}: Pick<StepperProps, 'defaultValue' | 'value' | 'min' | 'max' | 'step' | 'onChange'>) {
  const [current, { set, reset }] = useCounter(defaultValue ?? value, { min, max });

  const handleMinus = () => {
    Keyboard.dismiss();
    const value = +current - step;
    set(value);
    onChange?.(value);
  };

  const handleAdd = () => {
    Keyboard.dismiss();
    const value = +current + step;
    set(value);
    onChange?.(value);
  };

  const handleChange = (val: string) => {
    // 先校验是否是数字
    if (Number.isNaN(+val)) {
      reset();
      onChange?.(defaultValue);
    } else {
      set(+val);
      onChange?.(+val);
    }
  };

  return {
    current,

    handleAdd: useMemoizedFn(handleAdd),
    handleMinus: useMemoizedFn(handleMinus),
    handleChange: useMemoizedFn(handleChange),
  };
}

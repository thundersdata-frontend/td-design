import { useLatest, useMemoizedFn, useUpdateEffect } from '@td-design/rn-hooks';
import { Keyboard } from 'react-native';
import { useDerivedValue, useSharedValue, withSpring } from 'react-native-reanimated';
import type { SwitchProps } from '.';

const springConfig = {
  mass: 1,
  damping: 15,
  stiffness: 120,
  overshootClamping: false,
  restSpeedThreshold: 0.001,
  restDisplacementThreshold: 0.001,
};

export default function useSwitch({ checked, onChange }: Pick<SwitchProps, 'onChange' | 'checked'>) {
  const opened = useSharedValue(checked);
  const progress = useDerivedValue(() => (opened.value ? withSpring(1, springConfig) : withSpring(0, springConfig)));
  const onChangeRef = useLatest(onChange);

  useUpdateEffect(() => {
    opened.value = checked;
  }, [checked, opened]);

  const toggle = () => {
    Keyboard.dismiss();
    opened.value = !opened.value;
    onChangeRef.current?.(!checked);
  };

  return { progress, toggle: useMemoizedFn(toggle) };
}

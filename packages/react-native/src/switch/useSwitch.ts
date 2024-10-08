import { useEffect } from 'react';
import { Keyboard } from 'react-native';
import { useDerivedValue, useSharedValue, withSpring } from 'react-native-reanimated';

import { useMemoizedFn } from '@td-design/rn-hooks';

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
  const opened = useSharedValue<boolean>(false);
  const progress = useDerivedValue(() => (opened.value ? withSpring(1, springConfig) : withSpring(0, springConfig)));

  useEffect(() => {
    opened.value = checked ?? false;
  }, [checked]);

  const toggle = () => {
    Keyboard.dismiss();
    if (onChange) {
      onChange(!checked);
    } else {
      opened.value = !opened.value;
    }
  };

  return { progress, toggle: useMemoizedFn(toggle) };
}

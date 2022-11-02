import { useEffect } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

import useSafeState from '../useSafeState';

const initialValue = {
  window: Dimensions.get('window'),
  screen: Dimensions.get('screen'),
};

export default function useDimensions() {
  const [dimensions, setDimensions] = useSafeState(initialValue);

  useEffect(() => {
    function onChange({ window, screen }: { window: ScaledSize; screen: ScaledSize }) {
      setDimensions({ window, screen });
    }

    const subscription = Dimensions.addEventListener('change', onChange);

    return () => {
      // @ts-ignore - React Native >= 0.65
      if (typeof subscription?.remove === 'function') {
        // @ts-ignore - need update @types/react-native@0.65.x
        subscription.remove();
      } else {
        // @ts-ignore React Native < 0.65
        Dimensions.removeEventListener('change', onChange);
      }
    };
  }, [setDimensions]);

  return dimensions;
}

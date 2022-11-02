import { useEffect } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

import useDimensions from '../useDimensions';
import useSafeState from '../useSafeState';

const isOrientationPortrait = ({ width, height }: ScaledSize) => height >= width;
const isOrientationLandscape = ({ width, height }: ScaledSize) => width >= height;

export default function useDeviceOrientation() {
  const { screen } = useDimensions();

  const initialState = {
    portrait: isOrientationPortrait(screen),
    landscape: isOrientationLandscape(screen),
  };
  const [orientation, setOrientation] = useSafeState(initialState);

  useEffect(() => {
    const onChange = ({ screen }: { screen: ScaledSize }) => {
      setOrientation({
        portrait: isOrientationPortrait(screen),
        landscape: isOrientationLandscape(screen),
      });
    };

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
  }, [setOrientation]);

  return orientation;
}

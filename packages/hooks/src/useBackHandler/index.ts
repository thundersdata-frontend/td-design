import { useEffect } from 'react';
import { BackHandler } from 'react-native';

export default function useBackHandler(handler: () => boolean) {
  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', handler);

    return () => {
      if (typeof subscription?.remove === 'function') {
        subscription.remove();
      } else {
        // React Native < 0.65
        BackHandler.removeEventListener('hardwareBackPress', handler);
      }
    };
  }, [handler]);
}

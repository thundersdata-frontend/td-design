import { useEffect } from 'react';
import { AppState } from 'react-native';
import useSafeState from '../useSafeState';

export default function useAppState() {
  const [appState, setAppState] = useSafeState(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', setAppState);

    return () => {
      // @ts-expect-error - React Native >= 0.65
      if (typeof subscription?.remove === 'function') {
        // @ts-expect-error - need update @types/react-native@0.65.x
        subscription.remove();
      } else {
        // React Native < 0.65
        AppState.removeEventListener('change', setAppState);
      }
    };
  }, [setAppState]);

  return appState;
}

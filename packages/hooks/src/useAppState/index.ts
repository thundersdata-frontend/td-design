import { useEffect } from 'react';
import { AppState } from 'react-native';

import useSafeState from '../useSafeState';

export default function useAppState() {
  const [appState, setAppState] = useSafeState(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', setAppState);

    return () => {
      if (typeof subscription?.remove === 'function') {
        subscription.remove();
      } else {
        // @ts-ignore - need update @types/react-native@0.65.x
        AppState.removeEventListener('change', setAppState);
      }
    };
  }, [setAppState]);

  return appState;
}

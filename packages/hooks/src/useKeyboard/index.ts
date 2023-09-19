import { useEffect } from 'react';
import { Keyboard, KeyboardMetrics } from 'react-native';

import useBoolean from '../useBoolean';
import useSafeState from '../useSafeState';

const emptyCoord = Object.freeze({
  screenX: 0,
  screenY: 0,
  width: 0,
  height: 0,
});

const initialValue = {
  start: emptyCoord,
  end: emptyCoord,
};

export default function useKeyboard() {
  const [shown, { setTrue, setFalse }] = useBoolean(false);
  const [coords, setCoords] = useSafeState<{ start?: KeyboardMetrics; end?: KeyboardMetrics }>(initialValue);
  const [keyboardHeight, setKeyboardHeight] = useSafeState(0);

  useEffect(() => {
    const subscriptions = [
      Keyboard.addListener('keyboardWillShow', e => {
        setCoords({ start: e.startCoordinates, end: e.endCoordinates });
      }),
      Keyboard.addListener('keyboardDidShow', e => {
        setTrue();
        setCoords({ start: e.startCoordinates, end: e.endCoordinates });
        setKeyboardHeight(e.endCoordinates.height);
      }),
      Keyboard.addListener('keyboardWillHide', e => {
        setCoords({ start: e.startCoordinates, end: e.endCoordinates });
      }),
      Keyboard.addListener('keyboardDidHide', e => {
        setFalse();
        if (e) {
          setCoords({ start: e.startCoordinates, end: e.endCoordinates });
        } else {
          setCoords(initialValue);
          setKeyboardHeight(0);
        }
      }),
    ];

    return () => {
      subscriptions.forEach(subscription => subscription.remove());
    };
  }, [setCoords, setFalse, setKeyboardHeight, setTrue]);

  return {
    keyboardShown: shown,
    keyboardHeight,
    coords,
  };
}

import React from 'react';

import Portal from '../portal';
import NumberKeyboardModal from './NumberKeyboardModal';
import { NumberKeyboardModalProps } from './type';

export function showNumberKeyboard(props: Omit<NumberKeyboardModalProps, 'visible'>) {
  const key = Portal.add(
    <NumberKeyboardModal
      {...props}
      onAnimationEnd={visible => {
        if (!visible) {
          Portal.remove(key);
        }
      }}
    />
  );
}

export { default as NumberKeyboardView } from './NumberKeyboardView';
export { default as NumberKeyboardItem } from './NumberKeyboardItem';
export { default as NumberKeyboardInput } from './NumberKeyboardInput';

import React from 'react';
import NumberKeyboardView, { NumberKeyboardProps } from './NumberKeyboard';
import NumberKeyboardModal from './NumberKeyboardModal';
import Portal from '../portal';

function numberKeyboard(props: NumberKeyboardProps) {
  const key = Portal.add(<NumberKeyboardModal {...props} afterClose={() => Portal.remove(key)} />);

  return key;
}

export default Object.assign(NumberKeyboardView, {
  numberKeyboard,
});

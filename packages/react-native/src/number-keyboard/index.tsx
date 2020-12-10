import React from 'react';
import NumberKeyboard, { NumberKeyboardProps } from './NumberKeyboard';
import NumberKeyboardModal from './NumberKeyboardModal';
import Portal from '../portal';

function modal(props: NumberKeyboardProps) {
  const key = Portal.add(<NumberKeyboardModal {...props} afterClose={() => Portal.remove(key)} />);

  return key;
}

export default Object.assign(NumberKeyboard, {
  modal,
});

import React from 'react';

import Portal from '../portal';
import { VehicleKeyboardModalProps } from './type';
import VehicleKeyboardModal from './VehicleKeyboardModal';

export function showVehicleKeyboard(props: Omit<VehicleKeyboardModalProps, 'visible'>) {
  const key = Portal.add(
    <VehicleKeyboardModal
      {...props}
      onAnimationEnd={visible => {
        if (!visible) {
          Portal.remove(key);
        }
      }}
    />
  );
}

export { default as VehicleKeyboardView } from './VehicleKeyboardView';
export { default as VehicleKeyboardItem } from './VehicleKeyboardItem';
export { default as VehicleKeyboardInput } from './VehicleKeyboardInput';

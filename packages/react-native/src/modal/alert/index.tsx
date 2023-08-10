import React from 'react';

import Portal from '../../portal';
import { AlertProps } from '../type';
import AlertContainer from './AlertContainer';

export default function alert(props: AlertProps) {
  const key = Portal.add(
    <AlertContainer
      {...props}
      onAnimationEnd={visible => {
        if (!visible) {
          Portal.remove(key);
        }
      }}
    />
  );
}

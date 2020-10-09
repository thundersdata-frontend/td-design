import React from 'react';
import Portal from '../../portal';
import { AlertProps } from '../type';
import AlertContainer from './AlertContainer';

export default function alert(props: AlertProps) {
  const key = Portal.add(<AlertContainer {...props} afterClose={() => Portal.remove(key)} />);

  return key;
}

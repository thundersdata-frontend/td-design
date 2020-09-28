import React from 'react';
import Portal from '../../portal';
import { TipProps } from '../type';
import TipContainer from './TipContainer';

export default function tip(props: TipProps) {
  const key = Portal.add(<TipContainer {...props} afterClose={() => Portal.remove(key)} />);

  return key;
}

import React from 'react';

import Portal from '../../portal';
import { TipProps } from '../type';
import TipContainer from './TipContainer';

export default function tip(props: TipProps) {
  return Portal.add(<TipContainer {...props} />);
}

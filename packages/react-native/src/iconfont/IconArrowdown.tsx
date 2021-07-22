/* tslint:disable */
/* eslint-disable */

import React, { FC } from 'react';
import { ViewProps } from 'react-native';
import { GProps, SvgXml } from 'react-native-svg';
import { getIconColor } from './helper';
import { px } from '../helpers/normalize';

export interface IconfontProps extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IconArrowdown: FC<IconfontProps> = ({ size, color, ...rest }) => {
  const xml = `
<svg t="1626765369506" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19163" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><path d="M512 872c-12.2 0-24.6-4.6-34-14L190 570c-18.8-18.8-18.8-49.2 0-67.8 18.8-18.8 49.2-18.8 67.8 0l206 206V200c0-26.6 21.4-48 48-48s48 21.4 48 48v508.2l206-206c18.8-18.8 49.2-18.8 67.8 0 18.8 18.8 18.8 49.2 0 67.8L546 858c-9.4 9.4-21.8 14-34 14z" p-id="19164" fill=${getIconColor(
    color,
    0,
    '#333333'
  )}></path></svg>
`;

  return <SvgXml xml={xml} width={size} height={size} {...rest} />;
};

IconArrowdown.defaultProps = {
  size: px(16),
};

IconArrowdown = React.memo ? React.memo(IconArrowdown) : IconArrowdown;

export default IconArrowdown;

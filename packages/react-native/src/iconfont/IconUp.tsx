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

let IconUp: FC<IconfontProps> = ({ size, color, ...rest }) => {
  const xml = `
  <svg t="1626848224115" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1999" width="32" height="32"><path d="M895.7 659.9c0-9.6-3.2-19.3-9.6-27.4L545.2 208.7c-8.3-10.3-20.8-16.3-34.1-16.3-13.2 0-25.8 6-34 16.3L138 630.7c-15.1 18.8-12.1 46.3 6.7 61.4 18.8 15.1 46.3 12.1 61.4-6.7l305.1-379.6L818 687.3c15.1 18.8 42.6 21.8 61.4 6.7 10.7-8.7 16.3-21.3 16.3-34.1z" p-id="2000" fill="${getIconColor(
    color,
    0,
    '#333333'
  )}"></path></svg>
`;

  return <SvgXml xml={xml} width={size} height={size} {...rest} />;
};

IconUp.defaultProps = {
  size: px(16),
};

IconUp = React.memo ? React.memo(IconUp) : IconUp;

export default IconUp;

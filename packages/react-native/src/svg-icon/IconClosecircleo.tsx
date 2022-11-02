/* tslint:disable */

/* eslint-disable */
import React, { FC } from 'react';
import { ViewProps } from 'react-native';
import { GProps, SvgXml } from 'react-native-svg';

import { px } from '../helpers/normalize';
import { getIconColor } from './helper';

export interface SvgIconProps extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IconClosecircleo: FC<SvgIconProps> = ({ size, color, ...rest }) => {
  const xml = `
<svg width="24" height="24" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM7.53034 7.53033C7.82323 7.23744 8.29811 7.23744 8.591 7.53033L11.8033 10.7427L15.0156 7.5304C15.3085 7.23751 15.7834 7.23751 16.0763 7.5304C16.3692 7.82329 16.3692 8.29817 16.0763 8.59106L12.864 11.8033L16.0156 14.955C16.3085 15.2478 16.3085 15.7227 16.0156 16.0156C15.7227 16.3085 15.2479 16.3085 14.955 16.0156L11.8033 12.864L8.65166 16.0157C8.35877 16.3086 7.88389 16.3086 7.591 16.0157C7.29811 15.7228 7.29811 15.2479 7.591 14.955L10.7427 11.8033L7.53034 8.59099C7.23745 8.2981 7.23745 7.82322 7.53034 7.53033Z" fill="${getIconColor(
    color,
    0,
    '#999999'
  )}"/>
</svg>
`;

  return <SvgXml xml={xml} width={size} height={size} {...rest} />;
};

IconClosecircleo.defaultProps = {
  size: px(16),
};

IconClosecircleo = React.memo ? React.memo(IconClosecircleo) : IconClosecircleo;

export default IconClosecircleo;

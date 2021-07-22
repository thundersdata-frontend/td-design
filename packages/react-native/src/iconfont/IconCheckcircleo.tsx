/* tslint:disable */
/* eslint-disable */

import React, { FC } from 'react';
import { ViewProps } from 'react-native';
import { GProps, SvgCss } from 'react-native-svg';
import { getIconColor } from './helper';
import { px } from '../helpers/normalize';

export interface IconfontProps extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IconCheckcircleo: FC<IconfontProps> = ({ size, color, ...rest }) => {
  const xml = `
<svg t="1626768216813" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1946" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><defs><style type="text/css"></style></defs><path d="M512 1024C228.266667 1024 0 795.733333 0 512 0 228.266667 228.266667 0 512 0s512 228.266667 512 512C1024 795.733333 795.733333 1024 512 1024zM512 85.333333C277.333333 85.333333 85.333333 277.333333 85.333333 512c0 234.666667 192 426.666667 426.666667 426.666667s426.666667-192 426.666667-426.666667C938.666667 277.333333 746.666667 85.333333 512 85.333333zM456.533333 755.2C450.133333 763.733333 439.466667 768 426.666667 768s-23.466667-4.266667-29.866667-12.8l-170.666667-170.666667C217.6 578.133333 213.333333 567.466667 213.333333 554.666667c0-23.466667 19.2-42.666667 42.666667-42.666667 12.8 0 23.466667 4.266667 29.866667 12.8l140.8 140.8 311.466667-311.466667c8.533333-8.533333 19.2-12.8 29.866667-12.8 23.466667 0 42.666667 19.2 42.666667 42.666667 0 12.8-4.266667 23.466667-12.8 29.866667L456.533333 755.2z" p-id="1947" fill="${getIconColor(
    color,
    0,
    '#333333'
  )}"></path></svg>
`;

  return <SvgCss xml={xml} width={size} height={size} {...rest} />;
};

IconCheckcircleo.defaultProps = {
  size: px(16),
};

IconCheckcircleo = React.memo ? React.memo(IconCheckcircleo) : IconCheckcircleo;

export default IconCheckcircleo;

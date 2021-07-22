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

let IconCheck: FC<IconfontProps> = ({ size, color, ...rest }) => {
  const xml = `
<svg t="1626764791348" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10264" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><path d="M328.021333 816.682667a40.106667 40.106667 0 0 1-34.688-20.181334L133.973333 517.802667a39.978667 39.978667 0 1 1 69.504-39.68L336.64 711.253333 827.733333 218.794667a40.106667 40.106667 0 0 1 56.618667-0.085334 40.106667 40.106667 0 0 1 0.085333 56.576L358.186667 803.072l-1.877334 1.92a39.978667 39.978667 0 0 1-28.288 11.690667z" fill="${getIconColor(
    color,
    0,
    '#333333'
  )}" p-id="10265"></path></svg>
`;

  return <SvgXml xml={xml} width={size} height={size} {...rest} />;
};

IconCheck.defaultProps = {
  size: px(16),
};

IconCheck = React.memo ? React.memo(IconCheck) : IconCheck;

export default IconCheck;

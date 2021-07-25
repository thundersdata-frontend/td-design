/* tslint:disable */
/* eslint-disable */

import React, { FC } from 'react';
import { ViewProps } from 'react-native';
import { GProps, SvgXml } from 'react-native-svg';
import { getIconColor } from './helper';
import { px } from '../helpers/normalize';

export interface SvgIconProps extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IconClosecircleo: FC<SvgIconProps> = ({ size, color, ...rest }) => {
  const xml = `
<svg width="24" height="24" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
<path d="M12 2C6.4898 2 2 6.4898 2 12C2 17.5102 6.4898 22 12 22C17.5102 22 22 17.5102 22 12C22 6.4898 17.5102 2 12 2ZM14.551 13.5306C14.8571 13.8367 14.8571 14.3469 14.551 14.6531C14.3469 14.7551 14.2449 14.8571 14.0408 14.8571C13.8367 14.8571 13.6327 14.7551 13.5306 14.6531L12 13.1225L10.4694 14.6531C10.1633 14.9592 9.65306 14.9592 9.34694 14.6531C9.04082 14.3469 9.04082 13.8367 9.34694 13.5306L10.8776 12L9.34694 10.4694C9.04082 10.1633 9.04082 9.65306 9.34694 9.34694C9.65306 9.04082 10.1633 9.04082 10.4694 9.34694L12 10.8776L13.5306 9.34694C13.8367 9.04082 14.3469 9.04082 14.6531 9.34694C14.9592 9.65306 14.9592 10.1633 14.6531 10.4694L13.1225 12L14.551 13.5306Z" fill="${getIconColor(
    color,
    0,
    '#333333'
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

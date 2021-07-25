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

let IconLeft: FC<SvgIconProps> = ({ size, color, ...rest }) => {
  const xml = `
<svg width="24" height="24" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.0303 4.46967C16.3232 4.76256 16.3232 5.23744 16.0303 5.53033L9.56066 12L16.0303 18.4697C16.3232 18.7626 16.3232 19.2374 16.0303 19.5303C15.7374 19.8232 15.2626 19.8232 14.9697 19.5303L7.96967 12.5303C7.67678 12.2374 7.67678 11.7626 7.96967 11.4697L14.9697 4.46967C15.2626 4.17678 15.7374 4.17678 16.0303 4.46967Z" fill="${getIconColor(
    color,
    0,
    '#333333'
  )}"/>
</svg>
`;

  return <SvgXml xml={xml} width={size} height={size} {...rest} />;
};

IconLeft.defaultProps = {
  size: px(16),
};

IconLeft = React.memo ? React.memo(IconLeft) : IconLeft;

export default IconLeft;

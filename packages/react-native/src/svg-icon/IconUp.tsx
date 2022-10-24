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

let IconUp: FC<SvgIconProps> = ({ size, color, ...rest }) => {
  const xml = `
<svg width="24" height="24" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.5303 16.0303C19.2374 16.3232 18.7626 16.3232 18.4697 16.0303L12 9.56066L5.53033 16.0303C5.23744 16.3232 4.76256 16.3232 4.46967 16.0303C4.17678 15.7374 4.17678 15.2626 4.46967 14.9697L11.4697 7.96967C11.7626 7.67678 12.2374 7.67678 12.5303 7.96967L19.5303 14.9697C19.8232 15.2626 19.8232 15.7374 19.5303 16.0303Z" fill="${getIconColor(
    color,
    0,
    '#999999'
  )}"/>
</svg>
`;

  return <SvgXml xml={xml} width={size} height={size} {...rest} />;
};

IconUp.defaultProps = {
  size: px(16),
};

IconUp = React.memo ? React.memo(IconUp) : IconUp;

export default IconUp;

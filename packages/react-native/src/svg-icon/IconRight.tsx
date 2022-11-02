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

let IconRight: FC<SvgIconProps> = ({ size, color, ...rest }) => {
  const xml = `
<svg width="24" height="24" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.96967 19.5303C7.67678 19.2374 7.67678 18.7626 7.96967 18.4697L14.4393 12L7.96967 5.53033C7.67678 5.23744 7.67678 4.76256 7.96967 4.46967C8.26256 4.17678 8.73744 4.17678 9.03033 4.46967L16.0303 11.4697C16.3232 11.7626 16.3232 12.2374 16.0303 12.5303L9.03033 19.5303C8.73744 19.8232 8.26256 19.8232 7.96967 19.5303Z" fill="${getIconColor(
    color,
    0,
    '#999999'
  )}"/>
</svg>
`;

  return <SvgXml xml={xml} width={size} height={size} {...rest} />;
};

IconRight.defaultProps = {
  size: px(16),
};

IconRight = React.memo ? React.memo(IconRight) : IconRight;

export default IconRight;

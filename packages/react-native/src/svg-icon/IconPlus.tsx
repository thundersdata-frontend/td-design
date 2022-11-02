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

let IconPlus: FC<SvgIconProps> = ({ size, color, ...rest }) => {
  const xml = `
<svg width="24" height="24" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
<path d="M20 13H13V20C13 20.55 12.55 21 12 21C11.45 21 11 20.55 11 20V13H4C3.45 13 3 12.55 3 12C3 11.45 3.45 11 4 11H11V4C11 3.45 11.45 3 12 3C12.55 3 13 3.45 13 4V11H20C20.55 11 21 11.45 21 12C21 12.55 20.55 13 20 13Z" fill="${getIconColor(
    color,
    0,
    '#999999'
  )}"/>
</svg>
`;

  return <SvgXml xml={xml} width={size} height={size} {...rest} />;
};

IconPlus.defaultProps = {
  size: px(16),
};

IconPlus = React.memo ? React.memo(IconPlus) : IconPlus;

export default IconPlus;

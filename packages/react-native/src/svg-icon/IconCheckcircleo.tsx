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

let IconCheckcircleo: FC<SvgIconProps> = ({ size, color, ...rest }) => {
  const xml = `
<svg width="24" height="24" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.6209 9.40479C15.9213 9.70519 15.9213 10.1922 15.6209 10.4926L11.5183 14.5952C11.2179 14.8956 10.7308 14.8956 10.4304 14.5952L8.37915 12.5439C8.07875 12.2435 8.07875 11.7565 8.37915 11.4561C8.67955 11.1557 9.1666 11.1557 9.46701 11.4561L10.9744 12.9634L14.533 9.40479C14.8334 9.10439 15.3204 9.10439 15.6209 9.40479Z" fill="${getIconColor(
    color,
    0,
    '#333333'
  )}"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.53846C7.32682 3.53846 3.53846 7.32682 3.53846 12C3.53846 16.6732 7.32682 20.4615 12 20.4615C16.6732 20.4615 20.4615 16.6732 20.4615 12C20.4615 7.32682 16.6732 3.53846 12 3.53846ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z" fill="${getIconColor(
    color,
    1,
    '#333333'
  )}"/>
</svg>
`;

  return <SvgXml xml={xml} width={size} height={size} {...rest} />;
};

IconCheckcircleo.defaultProps = {
  size: px(16),
};

IconCheckcircleo = React.memo ? React.memo(IconCheckcircleo) : IconCheckcircleo;

export default IconCheckcircleo;

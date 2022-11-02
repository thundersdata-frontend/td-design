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

let IconArrowdown: FC<SvgIconProps> = ({ size, color, ...rest }) => {
  const xml = `
<svg width="24" height="24" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.2743 4C12.6885 4 13.0243 4.33579 13.0243 4.75V19.75C13.0243 20.1642 12.6885 20.5 12.2743 20.5C11.8601 20.5 11.5243 20.1642 11.5243 19.75V4.75C11.5243 4.33579 11.8601 4 12.2743 4Z" fill="${getIconColor(
    color,
    0,
    '#999999'
  )}"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.72046 13.1688C6.01396 12.8765 6.48884 12.8775 6.78112 13.171L12.2747 18.6873L17.7672 13.171C18.0595 12.8775 18.5344 12.8765 18.8279 13.1687C19.1214 13.461 19.1224 13.9359 18.8302 14.2294L12.8062 20.2794C12.6654 20.4207 12.4742 20.5002 12.2747 20.5002C12.0753 20.5002 11.884 20.4208 11.7433 20.2794L5.71827 14.2294C5.42598 13.9359 5.42696 13.4611 5.72046 13.1688Z" fill="${getIconColor(
    color,
    1,
    '#999999'
  )}"/>
</svg>
`;

  return <SvgXml xml={xml} width={size} height={size} {...rest} />;
};

IconArrowdown.defaultProps = {
  size: px(16),
};

IconArrowdown = React.memo ? React.memo(IconArrowdown) : IconArrowdown;

export default IconArrowdown;

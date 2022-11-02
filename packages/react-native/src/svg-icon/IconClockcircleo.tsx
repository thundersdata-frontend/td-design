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

let IconClockcircleo: FC<SvgIconProps> = ({ size, color, ...rest }) => {
  const xml = `
<svg width="24" height="24" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.9998 3.50049C7.305 3.50049 3.49979 7.3057 3.49979 12.0005C3.49979 16.6953 7.305 20.5005 11.9998 20.5005C16.6946 20.5005 20.4998 16.6953 20.4998 12.0005C20.4998 7.3057 16.6946 3.50049 11.9998 3.50049ZM1.99979 12.0005C1.99979 6.47727 6.47657 2.00049 11.9998 2.00049C17.523 2.00049 21.9998 6.47727 21.9998 12.0005C21.9998 17.5237 17.523 22.0005 11.9998 22.0005C6.47657 22.0005 1.99979 17.5237 1.99979 12.0005Z" fill="${getIconColor(
    color,
    0,
    '#999999'
  )}"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.6614 7.09668C12.0756 7.09668 12.4114 7.43247 12.4114 7.84668V12.2678L15.8156 14.2986C16.1713 14.5108 16.2877 14.9712 16.0755 15.3269C15.8633 15.6826 15.4029 15.799 15.0471 15.5868L11.2771 13.3378C11.0503 13.2025 10.9114 12.9578 10.9114 12.6937V7.84668C10.9114 7.43247 11.2472 7.09668 11.6614 7.09668Z" fill="${getIconColor(
    color,
    1,
    '#999999'
  )}"/>
</svg>
`;

  return <SvgXml xml={xml} width={size} height={size} {...rest} />;
};

IconClockcircleo.defaultProps = {
  size: px(16),
};

IconClockcircleo = React.memo ? React.memo(IconClockcircleo) : IconClockcircleo;

export default IconClockcircleo;

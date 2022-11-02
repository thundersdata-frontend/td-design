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

let IconMinus: FC<SvgIconProps> = ({ size, color, ...rest }) => {
  const xml = `
<svg width="24" height="24" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
<path d="M19 14H5C4.73481 14 4.48049 13.8946 4.29299 13.7071C4.10549 13.5195 4.00015 13.2652 4.00015 13C4.00015 12.7348 4.10549 12.4805 4.29299 12.2929C4.48049 12.1054 4.73481 12 5 12H19C19.2652 12 19.5195 12.1054 19.707 12.2929C19.8945 12.4805 19.9998 12.7348 19.9998 13C19.9998 13.2652 19.8945 13.5195 19.707 13.7071C19.5195 13.8946 19.2652 14 19 14Z" fill="${getIconColor(
    color,
    0,
    '#999999'
  )}"/>
</svg>
`;

  return <SvgXml xml={xml} width={size} height={size} {...rest} />;
};

IconMinus.defaultProps = {
  size: px(16),
};

IconMinus = React.memo ? React.memo(IconMinus) : IconMinus;

export default IconMinus;

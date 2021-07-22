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

let IconLeft: FC<IconfontProps> = ({ size, color, ...rest }) => {
  const xml = `
<svg t="1626764884970" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12008" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><path d="M724 896q-15.008 0-27.008-10.016L272.992 544.992q-16-12.992-16-34.016t16-34.016L695.008 137.952q14.016-11.008 32-8.992t29.504 16 9.504 32-16 28.992l-380 304.992 382.016 307.008q14.016 11.008 16 28.992t-10.016 32q-12.992 16.992-34.016 16.992z" p-id="12009" fill=${getIconColor(
    color,
    0,
    '#333333'
  )}></path></svg>
`;

  return <SvgXml xml={xml} width={size} height={size} {...rest} />;
};

IconLeft.defaultProps = {
  size: px(16),
};

IconLeft = React.memo ? React.memo(IconLeft) : IconLeft;

export default IconLeft;

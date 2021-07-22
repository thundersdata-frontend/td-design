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

let IconEllipsis: FC<IconfontProps> = ({ size, color, ...rest }) => {
  const xml = `
<svg t="1626763876278" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8498" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><path d="M192 512c0 35.2 28.8 64 64 64s64-28.8 64-64-28.8-64-64-64-64 28.8-64 64z m255.99999999 0c0 35.2 28.8 64 64.00000001 64.00000001s64-28.8 64.00000001-64.00000001-28.8-64-64.00000001-64.00000001-64 28.8-64.00000001 64.00000001z m256.00000001 0c0 35.2 28.8 64 64 64s64-28.8 64-64-28.8-64-64-64-64 28.8-64 64z" fill=${getIconColor(
    color,
    0,
    '#333333'
  )} p-id="8499"></path></svg>
`;

  return <SvgXml xml={xml} width={size} height={size} {...rest} />;
};

IconEllipsis.defaultProps = {
  size: px(16),
};

IconEllipsis = React.memo ? React.memo(IconEllipsis) : IconEllipsis;

export default IconEllipsis;

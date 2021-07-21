/* tslint:disable */
/* eslint-disable */

import React, { FC } from 'react';
import { ViewProps } from 'react-native';
import { GProps, SvgXml } from 'react-native-svg';
import { getIconColor } from './helper';

export interface IconfontProps extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IconReload: FC<IconfontProps> = ({ size, color, ...rest }) => {
  const xml = `
<svg t="1626764812610" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11208" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><path d="M756.821333 256C691.541333 203.264 601.472 170.666667 512 170.666667a341.333333 341.333333 0 1 0 341.333333 341.333333 42.666667 42.666667 0 0 1 85.333334 0c0 235.648-191.018667 426.666667-426.666667 426.666667S85.333333 747.648 85.333333 512 276.352 85.333333 512 85.333333c108.757333 0 217.898667 39.082667 298.666667 104.490667V128a42.666667 42.666667 0 0 1 85.333333 0v170.666667a42.666667 42.666667 0 0 1-42.666667 42.666666h-170.666666a42.666667 42.666667 0 0 1 0-85.333333h74.154666z" p-id="11209" fill=${getIconColor(
    color,
    0,
    '#333333'
  )}></path></svg>
`;

  return <SvgXml xml={xml} width={size} height={size} {...rest} />;
};

IconReload.defaultProps = {
  size: 20,
};

IconReload = React.memo ? React.memo(IconReload) : IconReload;

export default IconReload;

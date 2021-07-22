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

let IconClose: FC<IconfontProps> = ({ size, color, ...rest }) => {
  const xml = `
<svg t="1626763902096" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9460" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><path d="M572.16 512l183.466667-183.04a42.666667 42.666667 0 1 0-60.586667-60.586667L512 451.84l-183.04-183.466667a42.666667 42.666667 0 0 0-60.586667 60.586667l183.466667 183.04-183.466667 183.04a42.666667 42.666667 0 0 0 0 60.586667 42.666667 42.666667 0 0 0 60.586667 0l183.04-183.466667 183.04 183.466667a42.666667 42.666667 0 0 0 60.586667 0 42.666667 42.666667 0 0 0 0-60.586667z" fill=${getIconColor(
    color,
    0,
    '#333333'
  )} p-id="9461"></path></svg>
`;

  return <SvgXml xml={xml} width={size} height={size} {...rest} />;
};

IconClose.defaultProps = {
  size: px(16),
};

IconClose = React.memo ? React.memo(IconClose) : IconClose;

export default IconClose;

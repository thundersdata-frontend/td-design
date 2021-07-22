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

let IconBells: FC<IconfontProps> = ({ size, color, ...rest }) => {
  const xml = `
<svg t="1626765298524" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18360" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><path d="M859.952751 831.982667H831.964V383.992a319.993333 319.993333 0 0 0-283.983417-317.988042V36.009916a35.967251 35.967251 0 1 0-72.019833 0v29.994042A319.993333 319.993333 0 0 0 191.977333 383.992v447.990667H163.988583a35.967251 35.967251 0 1 0 0 72.019833h275.962251v47.999a71.934501 71.934501 0 1 0 143.997 0v-47.999h276.047582a35.967251 35.967251 0 1 0 0-72.019833z m-99.965918 0H263.954501V383.992A247.930835 247.930835 0 0 1 511.970667 135.975834 247.930835 247.930835 0 0 1 759.986833 383.992v447.990667z" p-id="18361" fill=${getIconColor(
    color,
    0,
    '#333333'
  )}></path></svg>
`;

  return <SvgXml xml={xml} width={size} height={size} {...rest} />;
};

IconBells.defaultProps = {
  size: px(16),
};

IconBells = React.memo ? React.memo(IconBells) : IconBells;

export default IconBells;

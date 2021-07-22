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

let IconPlus: FC<IconfontProps> = ({ size, color, ...rest }) => {
  const xml = `
<svg t="1626763805731" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7399" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><path d="M853.333333 554.666667 554.666667 554.666667l0 298.666667c0 23.466667-19.2 42.666667-42.666667 42.666667s-42.666667-19.2-42.666667-42.666667L469.333333 554.666667 170.666667 554.666667c-23.466667 0-42.666667-19.2-42.666667-42.666667 0-23.466667 19.2-42.666667 42.666667-42.666667l298.666667 0L469.333333 170.666667c0-23.466667 19.2-42.666667 42.666667-42.666667s42.666667 19.2 42.666667 42.666667l0 298.666667 298.666667 0c23.466667 0 42.666667 19.2 42.666667 42.666667C896 535.466667 876.8 554.666667 853.333333 554.666667z" p-id="7400" fill="${getIconColor(
    color,
    0,
    '#333333'
  )}"></path></svg>
`;

  return <SvgXml xml={xml} width={size} height={size} {...rest} />;
};

IconPlus.defaultProps = {
  size: px(16),
};

IconPlus = React.memo ? React.memo(IconPlus) : IconPlus;

export default IconPlus;

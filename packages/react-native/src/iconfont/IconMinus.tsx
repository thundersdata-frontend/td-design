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

let IconMinus: FC<IconfontProps> = ({ size, color, ...rest }) => {
  const xml = `
<svg t="1626765449548" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20917" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><path d="M810.666667 597.333333H213.333333a42.666667 42.666667 0 0 1 0-85.333333h597.333334a42.666667 42.666667 0 0 1 0 85.333333z" p-id="20918" fill="${getIconColor(
    color,
    0,
    '#333333'
  )}"></path></svg>
`;

  return <SvgXml xml={xml} width={size} height={size} {...rest} />;
};

IconMinus.defaultProps = {
  size: px(16),
};

IconMinus = React.memo ? React.memo(IconMinus) : IconMinus;

export default IconMinus;

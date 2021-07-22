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

let IconDown: FC<IconfontProps> = ({ size, color, ...rest }) => {
  const xml = `
<svg t="1626763143756" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1958" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><path d="M836.664 302.486c17.528-17.184 45.666-16.906 62.85 0.622 17.184 17.528 16.906 45.666-0.622 62.85L536.226 721.514c-17.53 17.186-45.674 16.906-62.858-0.628L124.924 365.33c-17.18-17.53-16.896-45.67 0.634-62.85 17.532-17.18 45.672-16.896 62.852 0.634L505.74 626.92l330.924-324.434z" p-id="1959" fill="${getIconColor(
    color,
    0,
    '#333333'
  )}"></path></svg>
`;

  return <SvgXml xml={xml} width={size} height={size} {...rest} />;
};

IconDown.defaultProps = {
  size: px(16),
};

IconDown = React.memo ? React.memo(IconDown) : IconDown;

export default IconDown;

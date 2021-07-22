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

let IconSearch: FC<IconfontProps> = ({ size, color, ...rest }) => {
  const xml = `
<svg t="1626765412373" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20111" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><path d="M990.752 938.056 733.816 681.12c55.76-69.712 89.096-158.128 89.096-254.328 0-225.024-182.416-407.456-407.456-407.456C190.432 19.336 8 201.768 8 426.792s182.432 407.456 407.456 407.456c96.208 0 184.624-33.344 254.328-89.112l256.936 256.936c8.84 8.84 20.424 13.264 32.008 13.264 11.592 0 23.176-4.424 32.024-13.264C1008.424 984.4 1008.424 955.728 990.752 938.056zM415.456 743.696c-175.024 0-316.904-141.88-316.904-316.904s141.88-316.904 316.904-316.904c175.032 0 316.904 141.88 316.904 316.904S590.488 743.696 415.456 743.696z" p-id="20112" fill=${getIconColor(
    color,
    0,
    '#333333'
  )}></path></svg>
`;

  return <SvgXml xml={xml} width={size} height={size} {...rest} />;
};

IconSearch.defaultProps = {
  size: px(16),
};

IconSearch = React.memo ? React.memo(IconSearch) : IconSearch;

export default IconSearch;

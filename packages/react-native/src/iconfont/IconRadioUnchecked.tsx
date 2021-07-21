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

let IconRadioUnchecked: FC<IconfontProps> = ({ size, color, ...rest }) => {
  const xml = `
<svg t="1626763739704" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6446" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><path d="M512 853.333333C323.413333 853.333333 170.666667 700.586667 170.666667 512 170.666667 323.413333 323.413333 170.666667 512 170.666667 700.586667 170.666667 853.333333 323.413333 853.333333 512 853.333333 700.586667 700.586667 853.333333 512 853.333333M512 85.333333C276.48 85.333333 85.333333 276.48 85.333333 512 85.333333 747.52 276.48 938.666667 512 938.666667 747.52 938.666667 938.666667 747.52 938.666667 512 938.666667 276.48 747.52 85.333333 512 85.333333Z" p-id="6447" fill=${getIconColor(
    color,
    0,
    '#333333'
  )}></path></svg>
`;

  return <SvgXml xml={xml} width={size} height={size} {...rest} />;
};

IconRadioUnchecked.defaultProps = {
  size: 20,
};

IconRadioUnchecked = React.memo ? React.memo(IconRadioUnchecked) : IconRadioUnchecked;

export default IconRadioUnchecked;

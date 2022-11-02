/* tslint:disable */

/* eslint-disable */
import React, { FC } from 'react';
import { ViewProps } from 'react-native';
import { GProps, SvgXml } from 'react-native-svg';

import { px } from '../helpers/normalize';
import { getIconColor } from './helper';

export interface SvgIconProps extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IconCheckboxUnchecked: FC<SvgIconProps> = ({ size, color, ...rest }) => {
  const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
    <path d="M19 3H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m0 2v14H5V5h14z" fill="${getIconColor(
      color,
      0,
      '#999999'
    )}"></path>
  </svg>
`;

  return <SvgXml xml={xml} width={size} height={size} {...rest} />;
};

IconCheckboxUnchecked.defaultProps = {
  size: px(16),
};

IconCheckboxUnchecked = React.memo ? React.memo(IconCheckboxUnchecked) : IconCheckboxUnchecked;

export default IconCheckboxUnchecked;

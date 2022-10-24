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

let IconCheckboxHalfchecked: FC<SvgIconProps> = ({ size, color, ...rest }) => {
  const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
    <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 16H5V5h14v14zm-2-2H7V7h10v10z" fill="${getIconColor(
      color,
      0,
      '#999999'
    )}"></path>
  </svg>
`;

  return <SvgXml xml={xml} width={size} height={size} {...rest} />;
};

IconCheckboxHalfchecked.defaultProps = {
  size: px(16),
};

IconCheckboxHalfchecked = React.memo ? React.memo(IconCheckboxHalfchecked) : IconCheckboxHalfchecked;

export default IconCheckboxHalfchecked;

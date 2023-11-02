import React, { FC, memo } from 'react';
import { ViewProps } from 'react-native';
import { GProps, SvgXml } from 'react-native-svg';

import { px } from '../helpers/normalize';
import { getIconColor } from './helper';

export interface SvgIconProps extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IconCheckboxChecked: FC<SvgIconProps> = ({ size, color, ...rest }) => {
  const xml = `
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
    <path d="M10 17l-5-5l1.41-1.42L10 14.17l7.59-7.59L19 8m0-5H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" fill="${getIconColor(
      color,
      0,
      '#999999'
    )}"></path>
  </svg>
`;

  return <SvgXml xml={xml} width={size} height={size} {...rest} />;
};

IconCheckboxChecked.defaultProps = {
  size: px(16),
};

export default memo(IconCheckboxChecked);

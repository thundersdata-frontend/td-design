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

let IconEllipsis: FC<SvgIconProps> = ({ size, color, ...rest }) => {
  const xml = `
<svg width="24" height="24" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
<path d="M4.5 12C4.5 12.825 5.175 13.5 6 13.5C6.825 13.5 7.5 12.825 7.5 12C7.5 11.175 6.825 10.5 6 10.5C5.175 10.5 4.5 11.175 4.5 12ZM10.5 12C10.5 12.825 11.175 13.5 12 13.5C12.825 13.5 13.5 12.825 13.5 12C13.5 11.175 12.825 10.5 12 10.5C11.175 10.5 10.5 11.175 10.5 12ZM16.5 12C16.5 12.825 17.175 13.5 18 13.5C18.825 13.5 19.5 12.825 19.5 12C19.5 11.175 18.825 10.5 18 10.5C17.175 10.5 16.5 11.175 16.5 12Z" fill="${getIconColor(
    color,
    0,
    '#999999'
  )}"/>
</svg>
`;

  return <SvgXml xml={xml} width={size} height={size} {...rest} />;
};

IconEllipsis.defaultProps = {
  size: px(16),
};

IconEllipsis = React.memo ? React.memo(IconEllipsis) : IconEllipsis;

export default IconEllipsis;

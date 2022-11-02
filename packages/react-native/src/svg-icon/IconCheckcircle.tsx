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

let IconCheckcircle: FC<SvgIconProps> = ({ size, color, ...rest }) => {
  const xml = `
<svg width="24" height="24" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM7.53034 11.7105C7.82323 11.4176 8.29811 11.4176 8.591 11.7105L11.0303 14.1498L16.6495 8.53052C16.9424 8.23763 17.4173 8.23763 17.7102 8.53052C18.0031 8.82341 18.0031 9.29829 17.7102 9.59118L11.5909 15.7105C11.3542 15.9471 10.9988 15.9926 10.7165 15.8469C10.6101 15.8112 10.5101 15.7509 10.4253 15.6662L7.53034 12.7712C7.23745 12.4783 7.23745 12.0034 7.53034 11.7105Z" fill="${getIconColor(
    color,
    0,
    '#999999'
  )}"/>
</svg>
`;

  return <SvgXml xml={xml} width={size} height={size} {...rest} />;
};

IconCheckcircle.defaultProps = {
  size: px(16),
};

IconCheckcircle = React.memo ? React.memo(IconCheckcircle) : IconCheckcircle;

export default IconCheckcircle;

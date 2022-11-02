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

let IconCheckcircleo: FC<SvgIconProps> = ({ size, color, ...rest }) => {
  const xml = `
<svg width="24" height="24" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 20.5C16.6944 20.5 20.5 16.6944 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="${getIconColor(
    color,
    0,
    '#999999'
  )}"/>
<path d="M7.53034 11.7105C7.82323 11.4176 8.29811 11.4176 8.591 11.7105L11.486 14.6055C11.7789 14.8984 11.7789 15.3733 11.486 15.6662V15.6662C11.1931 15.959 10.7182 15.959 10.4253 15.6662L7.53034 12.7712C7.23745 12.4783 7.23745 12.0034 7.53034 11.7105V11.7105Z" fill="${getIconColor(
    color,
    1,
    '#999999'
  )}"/>
<path d="M10.5302 15.7105C10.2373 15.4176 10.2373 14.9427 10.5302 14.6498L16.6495 8.53052C16.9424 8.23763 17.4173 8.23763 17.7102 8.53052V8.53052C18.0031 8.82341 18.0031 9.29829 17.7102 9.59118L11.5909 15.7105C11.298 16.0034 10.8231 16.0034 10.5302 15.7105V15.7105Z" fill="${getIconColor(
    color,
    2,
    '#999999'
  )}"/>
</svg>
`;

  return <SvgXml xml={xml} width={size} height={size} {...rest} />;
};

IconCheckcircleo.defaultProps = {
  size: px(16),
};

IconCheckcircleo = React.memo ? React.memo(IconCheckcircleo) : IconCheckcircleo;

export default IconCheckcircleo;

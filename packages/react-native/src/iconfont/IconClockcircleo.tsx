/* tslint:disable */
/* eslint-disable */

import React, { FC } from 'react';
import { ViewProps } from 'react-native';
import { GProps, SvgCss } from 'react-native-svg';
import { getIconColor } from './helper';

export interface IconfontProps extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IconClockcircleo: FC<IconfontProps> = ({ size, color, ...rest }) => {
  const xml = `
<svg t="1626768191083" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1434" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><defs><style type="text/css"></style></defs><path d="M512 0C229.205333 0 0 229.205333 0 512s229.205333 512 512 512 512-229.205333 512-512S794.794667 0 512 0z m311.082667 823.082667a437.717333 437.717333 0 0 1-139.904 94.293333c-54.186667 23.04-111.786667 34.602667-171.178667 34.602667-59.392 0-116.992-11.562667-171.221333-34.474667a440.448 440.448 0 0 1-139.861334-94.293333 437.717333 437.717333 0 0 1-94.293333-139.946667A436.608 436.608 0 0 1 71.936 512c0-59.392 11.605333-116.992 34.56-171.221333a440.448 440.448 0 0 1 94.293333-139.861334 437.717333 437.717333 0 0 1 139.861334-94.293333c54.314667-23.04 111.914667-34.645333 171.306666-34.645333 59.392 0 116.992 11.605333 171.178667 34.56 52.437333 22.186667 99.413333 53.845333 139.946667 94.293333 40.362667 40.362667 72.192 87.466667 94.293333 139.861333 22.997333 54.314667 34.56 111.914667 34.56 171.306667a437.461333 437.461333 0 0 1-128.853333 311.082667z m-90.069334-319.104h-185.002666V264.064a35.968 35.968 0 1 0-72.021334 0v239.957333c0 39.808 32.213333 72.021333 72.021334 72.021334h185.002666a35.968 35.968 0 1 0 0-72.021334z" p-id="1435" fill=${getIconColor(
    color,
    0,
    '#333333'
  )}></path></svg>
`;

  return <SvgCss xml={xml} width={size} height={size} {...rest} />;
};

IconClockcircleo.defaultProps = {
  size: 20,
};

IconClockcircleo = React.memo ? React.memo(IconClockcircleo) : IconClockcircleo;

export default IconClockcircleo;

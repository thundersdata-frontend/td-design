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

let IconCheckcircle: FC<IconfontProps> = ({ size, color, ...rest }) => {
  const xml = `
<svg t="1626765519625" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21730" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><path d="M512 85.333333c235.52 0 426.666667 191.146667 426.666667 426.666667s-191.146667 426.666667-426.666667 426.666667S85.333333 747.52 85.333333 512 276.48 85.333333 512 85.333333m-42.666667 618.666667l298.666667-298.666667-60.16-60.16L469.333333 583.253333l-131.84-131.413333L277.333333 512l192 192z" fill=${getIconColor(color, 0, '#333333')} p-id="21731"></path></svg>
`

  return (
    <SvgXml xml={xml}  width={size} height={size} {...rest} />
  );
};

IconCheckcircle.defaultProps = {
  size: 20,
};

IconCheckcircle = React.memo ? React.memo(IconCheckcircle) : IconCheckcircle;

export default IconCheckcircle;

/* tslint:disable */
/* eslint-disable */

import React, { FC } from 'react';
import { ViewProps } from 'react-native';
import { GProps, SvgCss } from 'react-native-svg';
import { getIconColor } from './helper';
import { px } from '../helpers/normalize';

export interface IconfontProps extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IconDate: FC<IconfontProps> = ({ size, color, ...rest }) => {
  const xml = `
<svg t="1626769784382" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2182" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><defs><style type="text/css"></style></defs><path d="M290.4576 0a35.84 35.84 0 0 1 35.84 35.84v67.0208h384.8704v-66.56a35.84 35.84 0 0 1 71.68 0v66.56H921.6a102.4 102.4 0 0 1 102.4 102.3488v716.4416A102.4 102.4 0 0 1 921.6 1024H102.4a102.4 102.4 0 0 1-102.4-102.3488V205.2096a102.4 102.4 0 0 1 102.4-102.3488h152.2176V35.7888a35.84 35.84 0 0 1 35.84-35.7888zM71.68 396.3904v525.2608a30.72 30.72 0 0 0 30.72 30.72h819.2a30.72 30.72 0 0 0 30.72-30.72V397.1072L71.68 396.3904z m269.6704 352.1024v85.2992H256v-85.2992h85.3504z m213.2992 0v85.2992H469.3504v-85.2992h85.2992z m213.3504 0v85.2992h-85.3504v-85.2992H768z m-426.6496-203.6224v85.2992H256v-85.2992h85.3504z m213.2992 0v85.2992H469.3504v-85.2992h85.2992z m213.3504 0v85.2992h-85.3504v-85.2992H768zM254.6176 174.4896H102.4a30.72 30.72 0 0 0-30.72 30.72v119.552l880.64 0.7168V205.2096a30.72 30.72 0 0 0-30.72-30.72h-138.752v47.5648a35.84 35.84 0 0 1-71.68 0v-47.5648H326.2976v47.104a35.84 35.84 0 0 1-71.68 0v-47.104z" fill=${getIconColor(
    color,
    0,
    '#333333'
  )} p-id="2183"></path></svg>
`;

  return <SvgCss xml={xml} width={size} height={size} {...rest} />;
};

IconDate.defaultProps = {
  size: px(16),
};

IconDate = React.memo ? React.memo(IconDate) : IconDate;

export default IconDate;

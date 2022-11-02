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

let IconSearch: FC<SvgIconProps> = ({ size, color, ...rest }) => {
  const xml = `
<svg width="24" height="24" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.7666 3.52783C7.21657 3.52783 3.52805 7.21636 3.52805 11.7664C3.52805 16.3164 7.21657 20.0049 11.7666 20.0049C16.3166 20.0049 20.0052 16.3164 20.0052 11.7664C20.0052 7.21636 16.3166 3.52783 11.7666 3.52783ZM2.02805 11.7664C2.02805 6.38793 6.38815 2.02783 11.7666 2.02783C17.1451 2.02783 21.5052 6.38793 21.5052 11.7664C21.5052 17.1448 17.1451 21.5049 11.7666 21.5049C6.38815 21.5049 2.02805 17.1448 2.02805 11.7664Z" fill="${getIconColor(
    color,
    0,
    '#999999'
  )}"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.4873 17.9552C17.7798 17.6619 18.2547 17.6613 18.548 17.9538L22.072 21.4687C22.3653 21.7612 22.3659 22.2361 22.0734 22.5294C21.7808 22.8227 21.306 22.8233 21.0127 22.5308L17.4887 19.0159C17.1954 18.7234 17.1948 18.2485 17.4873 17.9552Z" fill="${getIconColor(
    color,
    1,
    '#999999'
  )}"/>
</svg>
`;

  return <SvgXml xml={xml} width={size} height={size} {...rest} />;
};

IconSearch.defaultProps = {
  size: px(16),
};

IconSearch = React.memo ? React.memo(IconSearch) : IconSearch;

export default IconSearch;

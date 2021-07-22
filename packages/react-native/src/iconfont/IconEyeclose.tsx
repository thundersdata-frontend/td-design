/* tslint:disable */
/* eslint-disable */

import React, { FC } from 'react';
import { ViewProps } from 'react-native';
import { GProps, SvgXml } from 'react-native-svg';
import { getIconColor } from './helper';
import { px } from '../helpers/normalize';

export interface IconfontProps extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IconEyeclose: FC<IconfontProps> = ({ size, color, ...rest }) => {
  const xml = `
  <svg t="1626848373577" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3102" width="32" height="32"><path d="M1006.048 336.416v79.104a9.888 9.888 0 0 1-3.328 7.392c-48.608 43.2-86.912 73.632-114.88 91.36l95.2 110.656a9.888 9.888 0 0 1-1.248 14.08l-41.44 33.92a9.888 9.888 0 0 1-13.76-1.184l-104.032-120.96a698.336 698.336 0 0 1-168.384 57.408l50.88 136.32a9.888 9.888 0 0 1-5.952 12.768l-51.008 18.112a9.888 9.888 0 0 1-12.576-5.888l-56.064-150.24c-50.432 4.768-101.248 4.16-151.552-1.76l-56.704 152a9.888 9.888 0 0 1-12.576 5.888l-51.008-18.112a9.888 9.888 0 0 1-5.92-12.8l52.16-139.776a697.984 697.984 0 0 1-152.384-53.92l-104.032 120.96a9.888 9.888 0 0 1-13.76 1.216l-41.472-33.952a9.888 9.888 0 0 1-1.216-14.08l95.2-110.656c-27.968-17.728-66.272-48.192-114.88-91.36a9.92 9.92 0 0 1-3.328-7.392v-78.464a9.888 9.888 0 0 1 17.536-6.24l2.784 3.392 4.832 5.6c113.248 128.768 281.28 210.336 468.864 210.336 187.968 0 356.288-81.888 469.568-211.072l7.392-8.704a9.6 9.6 0 0 1 17.056 6.048z" p-id="3103" fill=${getIconColor(
    color,
    0,
    '#333333'
  )}></path></svg>
`;

  return <SvgXml xml={xml} width={size} height={size} {...rest} />;
};

IconEyeclose.defaultProps = {
  size: px(16),
};

IconEyeclose = React.memo ? React.memo(IconEyeclose) : IconEyeclose;

export default IconEyeclose;

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

let IconReload: FC<SvgIconProps> = ({ size, color, ...rest }) => {
  const xml = `
<svg width="24" height="24" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
<path d="M17.738 6C16.208 4.764 14.097 4 12 4C10.4177 4 8.87103 4.46919 7.55544 5.34824C6.23984 6.22729 5.21446 7.47672 4.60896 8.93853C4.00346 10.4003 3.84504 12.0089 4.15372 13.5607C4.4624 15.1126 5.22433 16.538 6.34315 17.6569C7.46197 18.7757 8.88743 19.5376 10.4393 19.8463C11.9911 20.155 13.5997 19.9965 15.0615 19.391C16.5233 18.7855 17.7727 17.7602 18.6518 16.4446C19.5308 15.129 20 13.5822 20 12C20 11.7348 20.1054 11.4804 20.2929 11.2929C20.4804 11.1054 20.7348 11 21 11C21.2652 11 21.5196 11.1054 21.7071 11.2929C21.8946 11.4804 22 11.7348 22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C14.549 2 17.107 2.916 19 4.449V3C19 2.73481 19.1054 2.4805 19.2929 2.29299C19.4805 2.10549 19.7348 2.00015 20 2.00015C20.2652 2.00015 20.5195 2.10549 20.7071 2.29299C20.8946 2.4805 21 2.73481 21 3V7C21 7.26522 20.8946 7.51957 20.7071 7.70711C20.5196 7.89464 20.2652 8 20 8H16C15.7348 7.99996 15.4805 7.89458 15.293 7.70705C15.1055 7.51952 15.0002 7.26519 15.0002 7C15.0002 6.73481 15.1055 6.48048 15.293 6.29295C15.4805 6.10541 15.7348 6.00004 16 6H17.738Z" fill="${getIconColor(
    color,
    0,
    '#999999'
  )}"/>
</svg>
`;

  return <SvgXml xml={xml} width={size} height={size} {...rest} />;
};

IconReload.defaultProps = {
  size: px(16),
};

IconReload = React.memo ? React.memo(IconReload) : IconReload;

export default IconReload;

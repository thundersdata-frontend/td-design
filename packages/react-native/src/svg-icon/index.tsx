import * as React from 'react';
import { SvgXml } from 'react-native-svg';

export interface SvgIconProps {
  xml: string;
  width: number;
  height: number;
}
export default ({ xml, width, height }: SvgIconProps) => <SvgXml xml={xml} width={width} height={height} />;

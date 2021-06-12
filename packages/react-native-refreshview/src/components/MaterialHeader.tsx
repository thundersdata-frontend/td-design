import React, { FC } from 'react';
import { requireNativeComponent } from 'react-native';
import { MaterialHeaderProps } from '../type';

const RCTMaterialHeader = requireNativeComponent('RCTMaterialHeader');

export const MaterialHeader: FC<MaterialHeaderProps> = props => {
  return <RCTMaterialHeader {...props} />;
};
export default MaterialHeader;

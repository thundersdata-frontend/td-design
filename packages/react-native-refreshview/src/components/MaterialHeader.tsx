import React, { FC } from 'react';
import { requireNativeComponent, ViewProps } from 'react-native';

const RCTMaterialHeader = requireNativeComponent('RCTMaterialHeader');
const MaterialHeader: FC<ViewProps> = props => {
  return <RCTMaterialHeader {...props} />;
};
export default MaterialHeader;

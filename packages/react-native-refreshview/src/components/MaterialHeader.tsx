import React from 'react';
import { requireNativeComponent, ViewProps } from 'react-native';

const RCTMaterialHeader = requireNativeComponent('RCTMaterialHeader');

export function MaterialHeader(props: ViewProps) {
  return <RCTMaterialHeader {...props} />;
}
export default MaterialHeader;

import React from 'react';
import { requireNativeComponent, ViewProps } from 'react-native';

const RCTAnyHeader = requireNativeComponent('RCTAnyHeader');

export function AnyHeader(
  props: {
    primaryColor?: string;
  } & ViewProps
) {
  return <RCTAnyHeader {...props} />;
}

export default AnyHeader;

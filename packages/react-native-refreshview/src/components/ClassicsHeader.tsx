import React from 'react';
import { requireNativeComponent, ViewProps } from 'react-native';

const RCTClassicsHeader = requireNativeComponent('RCTClassicsHeader');

export function ClassicsHeader(
  props: {
    primaryColor?: string;
    accentColor?: string;
  } & ViewProps
) {
  return <RCTClassicsHeader {...props} />;
}

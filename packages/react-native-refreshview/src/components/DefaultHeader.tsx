import React from 'react';
import { requireNativeComponent, ViewProps } from 'react-native';

const RCTDefaultHeader = requireNativeComponent('RCTDefaultHeader');

export function DefaultHeader(
  props: {
    primaryColor?: string;
    accentColor?: string;
  } & ViewProps
) {
  return <RCTDefaultHeader {...props} />;
}

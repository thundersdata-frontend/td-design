import React from 'react';
import { requireNativeComponent, ViewProps } from 'react-native';

const RCTStoreHouseHeader = requireNativeComponent('RCTStoreHouseHeader');

export function StoreHouseHeader(
  props: {
    textColor?: string;
    text?: string;
    fontSize?: number;
    lineWidth?: number;
    dropHeight?: number;
  } & ViewProps
) {
  return <RCTStoreHouseHeader {...props} />;
}

import React, { FC } from 'react';
import { requireNativeComponent, ViewProps } from 'react-native';

const RCTStoreHouseHeader = requireNativeComponent('RCTStoreHouseHeader');

export const StoreHouseHeader: FC<
  {
    textColor?: string;
    text?: string;
    fontSize?: number;
    lineWidth?: number;
    dropHeight?: number;
  } & ViewProps
> = props => {
  return <RCTStoreHouseHeader {...props} />;
};

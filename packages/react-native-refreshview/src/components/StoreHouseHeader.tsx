import React, { FC } from 'react';
import { requireNativeComponent, ViewProps } from 'react-native';

interface StoreHouseHeaderProps extends ViewProps {
  textColor?: string;
  text?: string;
  fontSize?: number;
  lineWidth?: number;
  dropHeight?: number;
}

const RCTStoreHouseHeader = requireNativeComponent('RCTStoreHouseHeader');
const StoreHouseHeader: FC<StoreHouseHeaderProps> = props => {
  return <RCTStoreHouseHeader {...props} />;
};
export default StoreHouseHeader;

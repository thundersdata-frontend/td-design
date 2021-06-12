import React, { FC } from 'react';
import { requireNativeComponent } from 'react-native';
import { AnyHeaderProps } from '../type';

const RCTAnyHeader = requireNativeComponent('RCTAnyHeader');

export const AnyHeader: FC<AnyHeaderProps> = props => {
  return <RCTAnyHeader {...props} />;
};

export default AnyHeader;

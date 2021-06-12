import React, { FC } from 'react';
import { requireNativeComponent } from 'react-native';
import { DefaultHeaderProps } from '../type';

const RCTDefaultHeader = requireNativeComponent('RCTDefaultHeader');

export const DefaultHeader: FC<DefaultHeaderProps> = props => {
  return <RCTDefaultHeader {...props} />;
};

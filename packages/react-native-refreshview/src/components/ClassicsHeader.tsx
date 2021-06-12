import React, { FC } from 'react';
import { requireNativeComponent } from 'react-native';
import { ClassicsHeaderProps } from '../type';

const RCTClassicsHeader = requireNativeComponent('RCTClassicsHeader');

export const ClassicsHeader: FC<ClassicsHeaderProps> = props => {
  return <RCTClassicsHeader {...props} />;
};

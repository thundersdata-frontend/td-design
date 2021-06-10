import React, { FC } from 'react';
import { requireNativeComponent, ViewProps } from 'react-native';

interface ClassicsHeaderProps extends ViewProps {
  primaryColor?: string;
  accentColor?: string;
}

const RCTClassicsHeader = requireNativeComponent('RCTClassicsHeader');
const ClassicsHeader: FC<ClassicsHeaderProps> = props => {
  return <RCTClassicsHeader {...props} />;
};
export default ClassicsHeader;

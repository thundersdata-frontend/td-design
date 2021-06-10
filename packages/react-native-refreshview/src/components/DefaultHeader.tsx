import React, { FC } from 'react';
import { requireNativeComponent, ViewProps } from 'react-native';

interface DefaultHeaderProps extends ViewProps {
  primaryColor?: string;
  accentColor?: string;
}

const RCTDefaultHeader = requireNativeComponent('RCTDefaultHeader');
const DefaultHeader: FC<DefaultHeaderProps> = props => {
  return <RCTDefaultHeader {...props} />;
};
export default DefaultHeader;

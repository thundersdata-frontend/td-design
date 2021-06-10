import React, { FC } from 'react';
import { requireNativeComponent, ViewProps } from 'react-native';

interface AnyHeaderProps extends ViewProps {
  primaryColor?: string;
}

const RCTAnyHeader = requireNativeComponent<AnyHeaderProps>('RCTAnyHeader');

const AnyHeader: FC<AnyHeaderProps> = props => {
  return <RCTAnyHeader {...props} />;
};
export default AnyHeader;

import React, { FC } from 'react';
import { Shadow, ShadowProps } from 'react-native-shadow-2';

const BoxShadow: FC<ShadowProps> = props => {
  return <Shadow {...props} />;
};
BoxShadow.displayName = 'BoxShadow';

export default BoxShadow;

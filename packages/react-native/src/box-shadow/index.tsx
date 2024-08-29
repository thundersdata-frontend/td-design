import React, { FC } from 'react';

let Shadow: any;
let ShadowProps: any;

try {
  ({ Shadow, ShadowProps } = require('react-native-shadow-2'));
} catch (error) {
  throw new Error(
    'The dependency "react-native-shadow-2" is not installed. Please install it to use the BoxShadow component.'
  );
}

const BoxShadow: FC<typeof ShadowProps> = props => {
  return <Shadow {...props} />;
};
BoxShadow.displayName = 'BoxShadow';

export default BoxShadow;

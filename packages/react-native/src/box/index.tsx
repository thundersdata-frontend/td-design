// @ts-ignore
import NativeView from 'react-native/Libraries/Components/View/ViewNativeComponent';

import { createBox } from '@shopify/restyle';

import { Theme } from '../theme';

const Box = createBox<Theme>(NativeView);
Box.displayName = 'Box';
Box.defaultProps = {
  pointerEvents: 'box-none',
};

export default Box;

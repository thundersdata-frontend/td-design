import { createBox } from '@shopify/restyle';

import { Theme } from '../theme';

const Box = createBox<Theme>();
Box.displayName = 'Box';
Box.defaultProps = {
  ...Box.defaultProps,
  pointerEvents: 'box-none',
};

export default Box;

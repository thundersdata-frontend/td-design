import React, { FC, PropsWithChildren } from 'react';

import { ThemeProvider as ShopifyThemeProvider } from '@shopify/restyle';

import Notify from '../notify';
import Portal from '../portal';
import theme, { Theme } from '../theme';
import Toast from '../toast';

const { lightTheme } = theme;
const ThemeProvider: FC<
  PropsWithChildren<{
    theme?: Theme;
  }>
> = ({ theme = lightTheme, children }) => {
  return (
    <ShopifyThemeProvider theme={theme}>
      <Toast />
      <Notify />
      <Portal.Host>{children}</Portal.Host>
    </ShopifyThemeProvider>
  );
};
ThemeProvider.displayName = 'ThemeProvider';

export default ThemeProvider;

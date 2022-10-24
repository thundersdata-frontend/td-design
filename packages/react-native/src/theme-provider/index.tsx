import { ThemeProvider as ShopifyThemeProvider } from '@shopify/restyle';
import React, { FC, PropsWithChildren } from 'react';

import Portal from '../portal';
import theme, { Theme } from '../theme';

const { lightTheme } = theme;
const ThemeProvider: FC<
  PropsWithChildren<{
    theme?: Theme;
  }>
> = ({ theme = lightTheme, children }) => {
  return (
    <ShopifyThemeProvider theme={theme}>
      <Portal.Host>{children}</Portal.Host>
    </ShopifyThemeProvider>
  );
};

export default ThemeProvider;

import React, { FC } from 'react';
import { ThemeProvider as ShopifyThemeProvider } from '@shopify/restyle';
import { theme as defaultTheme, Theme } from '../config/theme';
import Portal from '../portal';

const ThemeProvider: FC<{ theme?: Theme }> = ({ theme = defaultTheme, children }) => {
  return (
    <ShopifyThemeProvider theme={theme}>
      <Portal.Host>{children}</Portal.Host>
    </ShopifyThemeProvider>
  );
};

export default ThemeProvider;

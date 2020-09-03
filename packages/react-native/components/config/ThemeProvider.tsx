import React, { FC } from 'react';
import { ThemeProvider as ShopifyThemeProvider } from '@shopify/restyle';
import { theme as defaultTheme, Theme } from './theme';

const ThemeProvider: FC<{ theme?: Theme }> = ({ theme = defaultTheme, children }) => {
  return <ShopifyThemeProvider theme={theme}>{children}</ShopifyThemeProvider>;
};

export default ThemeProvider;

import React, { FC } from 'react';
import { ThemeProvider as ShopifyThemeProvider } from '@shopify/restyle';
import theme, { Theme } from '../theme';
import Portal from '../portal';

const { lightTheme } = theme;
const ThemeProvider: FC<{ theme?: Theme }> = ({ theme = lightTheme, children }) => {
  return (
    <ShopifyThemeProvider theme={theme}>
      <Portal.Host>{children}</Portal.Host>
    </ShopifyThemeProvider>
  );
};

export default ThemeProvider;

import React, { FC, PropsWithChildren } from 'react';
import { ThemeProvider as ShopifyThemeProvider } from '@shopify/restyle';
import theme, { Theme } from '../theme';
import Portal from '../portal';

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

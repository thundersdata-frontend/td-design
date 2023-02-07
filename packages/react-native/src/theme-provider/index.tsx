import NiceModal from '@ebay/nice-modal-react';
import { ThemeProvider as ShopifyThemeProvider } from '@shopify/restyle';
import React, { FC, PropsWithChildren } from 'react';

import PortalHost from '../portal/portalHost';
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
      <NiceModal.Provider>
        <PortalHost>{children}</PortalHost>
        <Toast />
      </NiceModal.Provider>
    </ShopifyThemeProvider>
  );
};
ThemeProvider.displayName = 'ThemeProvider';

export default ThemeProvider;

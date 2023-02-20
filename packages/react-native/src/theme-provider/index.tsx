import React, { FC, PropsWithChildren } from 'react';

import NiceModal from '@ebay/nice-modal-react';
import { ThemeProvider as ShopifyThemeProvider } from '@shopify/restyle';

import Notify from '../notify';
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
      <Toast />
      <Notify />
      <PortalHost>
        <NiceModal.Provider>{children}</NiceModal.Provider>
      </PortalHost>
    </ShopifyThemeProvider>
  );
};
ThemeProvider.displayName = 'ThemeProvider';

export default ThemeProvider;

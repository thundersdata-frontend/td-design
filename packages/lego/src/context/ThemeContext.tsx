import React, { createContext, FC, PropsWithChildren } from 'react';

import theme from '../theme';

export const ThemeContext = createContext(theme);

export const ThemeProvider: FC<PropsWithChildren<{ theme: typeof theme }>> = ({ theme, children }) => {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

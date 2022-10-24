import React, { createContext, FC } from 'react';

import theme from '../theme';

export const ThemeContext = createContext(theme);

export const ThemeProvider: FC<{ theme: typeof theme; children: any }> = ({ theme, children }) => {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

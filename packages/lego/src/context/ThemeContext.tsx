import React, { createContext, FC } from 'react';
import theme from '../theme';

export const ThemeContext = createContext(theme);

export const ThemeProvider: FC<{ theme: typeof theme }> = ({ theme, children }) => {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

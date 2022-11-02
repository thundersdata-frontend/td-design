import { theme as defaultTheme, Theme } from '@td-design/react-native';

export const lightTheme: Theme = {
  ...defaultTheme.lightTheme,
  colors: {
    ...defaultTheme.lightTheme.colors,
    // primary200: '#FFC700',
  },
};

export const darkTheme: Theme = {
  ...defaultTheme.darkTheme,
  colors: {
    ...defaultTheme.darkTheme.colors,
  },
};

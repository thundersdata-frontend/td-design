import { theme as defaultTheme, Theme } from '@td-design/react-native';

export const lightTheme: Theme = {
  ...defaultTheme.lightTheme,
  colors: {
    ...defaultTheme.lightTheme.colors,
  },
};

export const darkTheme: Theme = {
  ...defaultTheme.darkTheme,
  colors: {
    ...defaultTheme.darkTheme.colors,
  },
};

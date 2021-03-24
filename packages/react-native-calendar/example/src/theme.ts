import { theme as defaultTheme, darkTheme as defaultDarkTheme, Theme } from '@td-design/react-native';

export const theme: Theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
  },
};

export const darkTheme: Theme = {
  ...defaultDarkTheme,
  colors: {
    ...defaultDarkTheme.colors,
    primaryColor: 'red',
  },
};

import { theme as defaultTheme, Theme } from '@td-design/react-native';

const color = {
  green: '#00ffff',
};
export const theme: Theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    mainBackground: color.green,
  },
};

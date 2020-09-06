import { createTheme } from '@shopify/restyle';

export const palette = {
  purple: '#5A31F4',
  white: '#FFF',
  black: '#111',
  darkGray: '#333',
  lightGray: '#EEE',
  gray: '#bbb',
  red: '#ff0000',
  lightBlack: 'rgba(0,0,0, .4)',
};

export const theme = createTheme({
  spacing: {
    xs: 4,
    s: 8,
    m: 12,
    l: 16,
    xl: 20,
    xxl: 24,
  },
  borderRadii: {
    button: 4,
    icon: 10,
  },
  colors: {
    transparent: 'transparent',
    mainBackground: palette.lightGray,
    mainForeground: palette.black,
    primaryCardBackground: palette.purple,
    secondaryCardBackground: palette.white,
    primaryCardText: palette.white,
    secondaryCardText: palette.black,
    primaryTextColor: palette.purple,
    borderColor: palette.gray,
    iconReverseColor: palette.white,
    shadowColor: palette.lightBlack,
    underlayColor: palette.black,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
    largeTablet: 1024,
  },
  textVariants: {
    body: {
      fontSize: 16,
      lineHeight: 24,
      color: 'primaryTextColor',
    },
    buttonLabel: {
      fontSize: 12,
    },
  },
  cardVariants: {
    primary: {
      backgroundColor: 'primaryCardBackground',
      shadowOpacity: 0.3,
    },
    secondary: {
      backgroundColor: 'secondaryCardBackground',
      shadowOpacity: 0.1,
    },
  },
});
export type Theme = typeof theme;
export type Spacing = keyof Theme['spacing'];

export const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    mainBackground: palette.black,
    mainForeground: palette.white,
    secondaryCardBackground: palette.darkGray,
    secondaryCardText: palette.white,
  },
};

import { createTheme } from '@shopify/restyle';

import helpers from '../helpers';

const { px } = helpers;

const basePalette = {
  // 基础色
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  // 功能色
  func50: '#FBF5F5',
  func100: '#FFF7E3',
  func200: '#FFD21D',
  func300: '#52C41A',
  func400: '#1890FF',
  func500: '#F86E21',
  func600: '#F4333C',
  func700: 'transparent',
  func800: 'transparent',
  func900: 'transparent',
};

/** 默认调色板 */
const palette = {
  ...basePalette,
  // 主色
  primary50: '#E5F1FF',
  primary100: '#3AA3FF',
  primary200: '#005DFF',
  primary300: 'rgba(0, 93, 255, 0.7)',
  primary400: 'rgba(0, 93, 255, 0.4)',
  primary500: 'transparent',
  primary600: 'transparent',
  primary700: 'transparent',
  primary800: 'transparent',
  primary900: 'transparent',

  // 中性色
  gray50: '#F5F5F5',
  gray100: '#E5E5E5',
  gray200: '#CCCCCC',
  gray300: '#999999',
  gray400: '#666666',
  gray500: '#333333',
  gray600: 'rgba(0, 0, 0, 0.4)',
  gray700: 'rgba(0, 0, 0, 0.04)',
  gray800: 'transparent',
  gray900: 'transparent',
};

const lightTheme = createTheme({
  spacing: {
    x1: px(4),
    x2: px(8),
    x3: px(12),
    x4: px(16),
    x5: px(20),
    x6: px(24),
    x7: px(28),
    x8: px(32),
    x9: px(36),
    x10: px(40),
  },
  borderRadii: {
    x1: px(4),
    x2: px(8),
    x3: px(12),
    x4: px(16),
    x5: px(20),
    x6: px(24),
    x7: px(28),
    x8: px(32),
    x9: px(36),
    x10: px(40),
  },
  zIndices: {
    '1': 1,
    '9': 9,
    '19': 9,
    '29': 9,
    '39': 9,
    '49': 9,
    '59': 9,
    '69': 9,
    '79': 9,
    '89': 9,
    '99': 99,
    '199': 199,
    '299': 299,
    '399': 399,
    '499': 499,
    '599': 599,
    '699': 699,
    '799': 799,
    '899': 899,
    '999': 999,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
    largeTablet: 1024,
  },
  colors: {
    ...palette,
    background: palette.gray50,
    mask: palette.gray600,
    border: palette.gray200,
    icon: palette.gray300,
    disabled: palette.gray200,
    text: palette.gray500,
    text_active: palette.white,
    primary_text: palette.black,
    primary_background: palette.white,
  },
  textVariants: {
    h0: {
      fontWeight: 'bold',
      fontSize: px(28),
      lineHeight: px(39),
      fontFamily: 'PingFang SC',
    },
    h1: {
      fontWeight: '500',
      fontSize: px(18),
      lineHeight: px(25),
      fontFamily: 'PingFang SC',
    },
    h2: {
      fontWeight: '500',
      fontSize: px(16),
      lineHeight: px(22),
      fontFamily: 'PingFang SC',
    },
    h3: {
      fontWeight: '500',
      fontSize: px(14),
      lineHeight: px(19),
      fontFamily: 'PingFang SC',
    },
    h4: {},
    h5: {},
    h6: {},
    h7: {},
    h8: {},
    h9: {},
    p0: {
      fontSize: px(16),
      lineHeight: px(22),
      fontFamily: 'PingFang SC',
    },
    p1: {
      fontSize: px(14),
      lineHeight: px(19),
      fontFamily: 'PingFang SC',
    },
    p2: {
      fontSize: px(12),
      lineHeight: px(16),
      fontFamily: 'PingFang SC',
    },
    p3: {
      fontSize: px(10),
      lineHeight: px(14),
      fontFamily: 'PingFang SC',
    },
    p4: {},
    p5: {},
    p6: {},
    p7: {},
    p8: {},
    p9: {},
    d0: {
      fontSize: px(24),
      lineHeight: px(28),
      fontFamily: 'Roboto',
    },
    d1: {
      fontSize: px(18),
      lineHeight: px(21),
      fontFamily: 'Roboto',
    },
    d2: {
      fontSize: px(14),
      lineHeight: px(19),
      fontFamily: 'Roboto',
    },
    d3: {
      fontSize: px(12),
      lineHeight: px(14),
      fontFamily: 'Roboto',
    },
    d4: {},
    d5: {},
    d6: {},
    d7: {},
    d8: {},
    d9: {},
  },
  theme: 'light',
});
export type Theme = typeof lightTheme;
export type Spacing = keyof Theme['spacing'];
export type Color = keyof Theme['colors'];
export type BorderRadius = keyof Theme['borderRadii'];

/** 深色调色板 */
const darkPalette = {
  ...basePalette,
  // 主色
  primary50: 'rgba(0, 93, 255, 0.3)',
  primary100: '#3AA3FF',
  primary200: '#005DFF',
  primary300: 'rgba(0, 93, 255, 0.7)',
  primary400: 'rgba(0, 93, 255, 0.4)',
  primary500: 'transparent',
  primary600: 'transparent',
  primary700: 'transparent',
  primary800: 'transparent',
  primary900: 'transparent',

  // 中性色
  gray50: '#131C22',
  gray100: 'rgba(255, 255, 255, 0.15)',
  gray200: 'rgba(255, 255, 255, 0.25)',
  gray300: 'rgba(255, 255, 255, 0.4)',
  gray400: 'rgba(255, 255, 255, 0.6)',
  gray500: 'rgba(255, 255, 255, 0.8)',
  gray600: 'rgba(0, 0, 0, 0.4)',
  gray700: 'rgba(0, 0, 0, 0.04)',
  gray800: 'transparent',
  gray900: 'transparent',
};

const darkTheme: Theme = {
  ...lightTheme,
  colors: {
    ...darkPalette,
    background: darkPalette.gray50,
    mask: darkPalette.gray600,
    border: darkPalette.gray400,
    icon: darkPalette.gray300,
    disabled: darkPalette.gray200,
    text: darkPalette.gray500,
    text_active: darkPalette.white,
    primary_text: palette.white,
    primary_background: palette.black,
  },
  theme: 'dark',
};

export default {
  lightTheme,
  darkTheme,
};

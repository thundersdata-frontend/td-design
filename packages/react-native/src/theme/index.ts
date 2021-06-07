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
  // 中性色
  gray50: '#F5F5F5',
  gray100: '#E5E5E5',
  gray200: '#CCCCCC',
  gray300: '#999999',
  gray400: '#666666',
  gray500: '#333333',
  gray600: 'rgba(0, 0, 0, 0.4)',
  gray700: 'rgba(0, 0, 0, 0.04)',
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
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
    largeTablet: 1024,
  },
  colors: {
    ...palette,
    background: palette.gray50,
    underlay: palette.gray100,
    mask: palette.gray600,
    border: palette.gray200,
    icon: palette.gray300,
    disabled: palette.gray200,
    primary_disabled: palette.primary300,
    text: palette.gray500,
    text_active: palette.white,
  },
  textVariants: {
    h0: {
      fontWeight: '500',
      fontSize: 24,
      lineHeight: 33,
    },
    h1: {
      fontWeight: '500',
      fontSize: 18,
      lineHeight: 25,
    },
    h2: {
      fontWeight: '500',
      fontSize: 16,
      lineHeight: 22,
    },
    p0: {
      fontSize: 16,
      lineHeight: 22,
    },
    p1: {
      fontSize: 14,
      lineHeight: 19,
    },
    p2: {
      fontSize: 12,
      lineHeight: 16,
    },
    p3: {
      fontSize: 10,
      lineHeight: 14,
    },
  },
  tagVariants: {
    /** 大标签 */
    large: {
      width: px(108),
      height: px(32),
      justifyContent: 'center',
      alignItems: 'center',
    },
    /** 中标签, 默认标签 */
    middle: {
      width: px(80),
      height: px(24),
      justifyContent: 'center',
      alignItems: 'center',
    },
    /** 小标签 */
    small: {
      width: px(36),
      height: px(20),
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
});
export type Theme = typeof lightTheme;
export type Spacing = keyof Theme['spacing'];
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

  // 中性色
  gray50: '#131C22',
  gray100: 'rgba(255, 255, 255, 0.15)',
  gray200: 'rgba(255, 255, 255, 0.25)',
  gray300: 'rgba(255, 255, 255, 0.4)',
  gray400: 'rgba(255, 255, 255, 0.6)',
  gray500: 'rgba(255, 255, 255, 0.8)',
  gray600: 'rgba(0, 0, 0, 0.4)',
  gray700: 'rgba(0, 0, 0, 0.04)',
};

const darkTheme: Theme = {
  ...lightTheme,
  colors: {
    ...darkPalette,
    background: darkPalette.gray50,
    underlay: darkPalette.gray100,
    mask: darkPalette.gray600,
    border: darkPalette.gray400,
    icon: darkPalette.gray300,
    disabled: darkPalette.gray300,
    primary_disabled: darkPalette.primary300,
    text: darkPalette.gray500,
    text_active: darkPalette.white,
  },
};

export default {
  lightTheme,
  darkTheme,
};

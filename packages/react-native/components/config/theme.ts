import { createTheme } from '@shopify/restyle';
import { px } from '../helper';

export const baseFunctionPalette = {
  red: '#F4443C',
  orange: '#F86E21',
  green: '#52C41A',
  white: '#ffffff',
  black: '#000000',
  blue: '#005DFF',
  mediumBlue: '#1890FF',
  lightBlue: '#3AA3FF',
  yellow: '#FFD21D',
  lightRed: '#FBF5F5',
  lightOrange: '#FFF7E3',
  pink: '#ff00a1',
  twentyPercentBlack: 'rgba(0, 0, 0, 0.2)',
};

export const palette = {
  ...baseFunctionPalette,
  cyan: '#E5F1FF',
  dark: '#333333',
  lightDark: '#666666',
  gray: '#999999',
  mediumGray: '#CCCCCC',
  lightGray: '#E5E5E5',
};

export const theme = createTheme({
  spacing: {
    xs: px(4),
    s: px(8),
    m: px(12),
    l: px(16),
    xl: px(20),
    xxl: px(24),
  },
  borderRadii: {
    icon: px(10),
  },
  colors: {
    transparent: 'transparent',
    success: palette.green,
    warn: palette.orange,
    fail: palette.red,
    link: palette.mediumBlue,
    white: palette.white,
    black: palette.black,
    /** 主色 */
    primaryColor: palette.blue,
    /** 渐变色（起） */
    secondaryColor: palette.lightBlue,
    /** 背景色-1 */
    backgroundColor1: palette.cyan,
    /** 警示性颜色-1 */
    dangerousColor: palette.red,
    /** 警示性颜色-2 */
    warningColor1: palette.orange,
    /** 警示性颜色-3 */
    warningColor2: palette.yellow,
    /** 背景色-2 */
    backgroundColor2: palette.lightRed,
    /** 背景色-3 */
    backgroundColor3: palette.lightOrange,
    /** 标题颜色 */
    primaryTextColor: palette.dark,
    /** 正文颜色 */
    secondaryTextColor: palette.lightDark,
    /** 提示性颜色-1 */
    primaryTipColor: palette.gray,
    /** 提示性颜色-2 */
    secondaryTipColor: palette.mediumGray,
    /** 提示性颜色-2-反转 */
    secondaryTipReverseColor: palette.pink,
    /** 蒙层颜色 */
    overlayColor: palette.twentyPercentBlack,
    /** 分割线、置灰 */
    borderColor: palette.lightGray,
    backgroundColor4: palette.white,
    backgroundColor5: palette.white,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
    largeTablet: 1024,
  },
  textVariants: {
    /** 主标题-1  */
    primaryTitle: {
      fontFamily: 'SourceHanSansCN-Medium',
      fontSize: px(18),
      color: 'primaryTextColor',
    },
    /** 主标题-2 */
    primaryTitleReverse: {
      fontFamily: 'SourceHanSansCN-Medium',
      fontSize: px(18),
      color: 'white',
    },
    /** 内容性文字-1 */
    primaryBody: {
      fontFamily: 'SourceHanSansCN-Regular',
      fontSize: px(16),
      color: 'primaryTextColor',
    },
    /** 内容性文字-2 */
    primaryBodyReverse: {
      fontFamily: 'SourceHanSansCN-Regular',
      fontSize: px(16),
      color: 'white',
    },
    /** 内容性文字-3 */
    secondaryBody: {
      fontFamily: 'SourceHanSansCN-Regular',
      fontSize: px(14),
      color: 'primaryTextColor',
    },
    /** 内容性文字-4 */
    secondaryBodyReverse: {
      fontFamily: 'SourceHanSansCN-Regular',
      fontSize: px(14),
      color: 'secondaryTextColor',
    },
    /** 内容性文字-5 */
    thirdBody: {
      fontFamily: 'SourceHanSansCN-Regular',
      fontSize: px(12),
      color: 'secondaryTextColor',
    },
    /** 提示性文字-1 */
    primaryTip: {
      fontFamily: 'SourceHanSansCN-Regular',
      fontSize: px(16),
      color: 'secondaryTipColor',
    },
    /** 提示性文字-2 */
    primaryTipReverse: {
      fontFamily: 'SourceHanSansCN-Regular',
      fontSize: px(16),
      color: 'primaryColor',
    },
    /** 提示性文字-3 */
    secondaryTip: {
      fontFamily: 'SourceHanSansCN-Regular',
      fontSize: px(14),
      color: 'primaryColor',
    },
    /** 提示性文字-4 */
    secondaryTipReverse: {
      fontFamily: 'SourceHanSansCN-Regular',
      fontSize: px(14),
      color: 'secondaryTipReverseColor',
    },
    /** 提示性文字-5 */
    thirdTip: {
      fontFamily: 'SourceHanSansCN-Regular',
      fontSize: px(14),
      color: 'warningColor1',
    },
    /** 警示性文字 */
    warn: {
      fontFamily: 'SourceHanSansCN-Regular',
      fontSize: px(16),
      color: 'dangerousColor',
    },
    /** 辅助性文字-1 */
    primaryHelp: {
      fontFamily: 'SourceHanSansCN-Regular',
      fontSize: px(12),
      color: 'primaryTipColor',
    },
    /** 辅助性文字-2 */
    secondaryHelp: {
      fontFamily: 'SourceHanSansCN-Regular',
      fontSize: px(10),
      color: 'primaryTipColor',
    },
    /** 辅助性文字-3 */
    secondaryHelpReverse: {
      fontFamily: 'SourceHanSansCN-Regular',
      fontSize: px(10),
      color: 'white',
    },
    /** 辅助性文字-4 */
    thirdHelp: {
      fontFamily: 'SourceHanSansCN-Regular',
      fontSize: px(10),
      color: 'primaryColor',
    },
    /** 日期-1 */
    primaryDate: {
      fontFamily: 'Roboto-Regular',
      fontSize: px(18),
      color: 'primaryTextColor',
    },
    /** 日期-2 */
    secondaryDate: {
      fontFamily: 'Roboto-Regular',
      fontSize: px(14),
      color: 'primaryTextColor',
    },
    /** 数字-1 */
    primaryNumber: {
      fontFamily: 'Roboto-Regular',
      fontSize: px(14),
      color: 'primaryColor',
    },
    /** 数字-2 */
    secondaryNumber: {
      fontFamily: 'Roboto-Regular',
      fontSize: px(8),
      color: 'white',
    },
  },
});
export type Theme = typeof theme;
export type Spacing = keyof Theme['spacing'];

export const darkPalette = {
  ...baseFunctionPalette,
  thirtyBlue: 'rgba(0, 93, 255, 0.3)',
  eightyPercentWhite: 'rgba(255, 255, 255, 0.8)',
  sixtyPercentWhite: 'rgba(255, 255, 255, 0.6)',
  fortyPercentWhite: 'rgba(255, 255, 255, 0.4)',
  twentyFivePercentWhite: 'rgba(255, 255, 255, 0.25)',
  fifteenPercentWhite: 'rgba(255, 255, 255, 0.15)',
  mediumDark: '#141D24',
  dark: '#121212',
};
export const darkTheme: Theme = {
  ...theme,
  colors: {
    transparent: 'transparent',
    success: palette.green,
    warn: palette.orange,
    fail: palette.red,
    link: palette.mediumBlue,
    white: palette.white,
    black: palette.black,
    /** 主色 */
    primaryColor: darkPalette.blue,
    /** 渐变色（起） */
    secondaryColor: darkPalette.lightBlue,
    /** 背景色-1 */
    backgroundColor1: darkPalette.thirtyBlue,
    /** 警示性颜色-1 */
    dangerousColor: darkPalette.red,
    /** 警示性颜色-2 */
    warningColor1: palette.orange,
    /** 警示性颜色-3 */
    warningColor2: palette.yellow,
    /** 背景色-2 */
    backgroundColor2: palette.lightRed,
    /** 背景色-3 */
    backgroundColor3: palette.lightOrange,
    /** 标题颜色 */
    primaryTextColor: darkPalette.eightyPercentWhite,
    /** 正文颜色 */
    secondaryTextColor: darkPalette.sixtyPercentWhite,
    /** 提示性颜色-1 */
    primaryTipColor: darkPalette.fortyPercentWhite,
    /** 提示性颜色-2 */
    secondaryTipColor: darkPalette.twentyFivePercentWhite,
    /** 提示性颜色-2-反转 */
    secondaryTipReverseColor: darkPalette.pink,
    /** 蒙层颜色 */
    overlayColor: darkPalette.fifteenPercentWhite,
    /** 分割线、置灰 */
    borderColor: darkPalette.fifteenPercentWhite,
    backgroundColor4: darkPalette.mediumDark,
    backgroundColor5: darkPalette.dark,
  },
};

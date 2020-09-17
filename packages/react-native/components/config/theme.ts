import { createTheme } from '@shopify/restyle';
import { px } from '../helper';

export const palette = {
  blue: '#005DFF',
  lightBlue: '#3AA3FF',
  cyan: '#E5F1FF',
  red: '#F4443C',
  lightRed: '#FBF5F5',
  orange: '#F86E21',
  lightOrange: '#FFF7E3',
  yellow: '#FFD21D',
  dark: '#333333',
  lightDark: '#666666',
  gray: '#999999',
  mediumGray: '#CCCCCC',
  lightGray: '#E5E5E5',
  white: '#ffffff',
  pink: '#ff00a1',
  black: '#000000',
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
    base: px(4),
  },
  colors: {
    transparent: 'transparent',
    primaryColor: palette.blue,
    secondaryColor: palette.lightBlue,
    backgroundColor1: palette.cyan,
    dangerousColor: palette.red,
    warningColor1: palette.orange,
    warningColor2: palette.yellow,
    backgroundColor2: palette.lightRed,
    backgroundColor3: palette.lightOrange,
    primaryTextColor: palette.dark,
    secondaryTextColor: palette.lightDark,
    primaryTipColor: palette.gray,
    secondaryTipColor: palette.mediumGray,
    secondaryTipReverseColor: palette.pink,
    overlayColor: palette.mediumGray,
    borderColor: palette.lightGray,
    white: palette.white,
    black: palette.black,
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

export const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
  },
};

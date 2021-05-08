import { createTheme } from '@shopify/restyle';
import Color from 'color';
import { px } from '../helper';

export const basePalette = {
  red: '#F4443C',
  orange: '#F86E21',
  green: '#52C41A',
  blue: '#005DFF',
  mediumBlue: '#1890FF',
  lightBlue: '#3AA3FF',
  yellow: '#FFD21D',
  pink: '#FF00A1',
  lightRed: '#FBF5F5',
  lightOrange: '#FFF7E3',
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

/** 默认调色板 */
export const palette = {
  ...basePalette,
  cyan: '#E5F1FF',
  dark: '#333333',
  mediumDark: '#666666',
  lightDark: '#999999',
  mediumGray: '#CCCCCC',
  lightGray: '#E5E5E5',
};

/** 深色调色板 */
export const darkPalette = {
  ...basePalette,
  dark: '#121212',
  darkBlue: '#141D24',
  lightOrange: '#292929',
  grey: '#dddddd',
  alphaBlue: new Color(basePalette.blue).alpha(0.3).string(),
  darkWhite: new Color(basePalette.white).alpha(0.8).string(),
  mediumWhite: new Color(basePalette.white).alpha(0.6).string(),
  lightWhite: new Color(basePalette.white).alpha(0.4).string(),
  gray: new Color(basePalette.white).alpha(0.25).string(),
  darkGray: new Color(basePalette.white).alpha(0.15).string(),
};

export const theme = createTheme({
  spacing: {
    xxs: px(3),
    xs: px(4),
    s: px(8),
    m: px(12),
    l: px(16),
    xl: px(20),
    xxl: px(24),
  },
  borderRadii: {
    corner: px(8),
    icon: px(8),
    base: px(4),
    tag: px(3),
  },
  zIndices: {
    notice: 9,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
    largeTablet: 1024,
  },
  colors: {
    /** 基础颜色 */
    transparent: 'transparent',
    success: palette.green,
    warn: palette.orange,
    fail: palette.red,
    link: palette.mediumBlue,
    white: palette.white,
    black: palette.black,
    primary: palette.blue,
    secondary: palette.lightBlue,
    border: palette.lightGray,
    primaryText_1: palette.dark,
    primaryText_2: palette.white,
    contentText_1: palette.dark,
    contentText_2: palette.white,
    contentText_3: palette.dark,
    contentText_4: palette.mediumDark,
    contentText_5: palette.mediumDark,
    hintText_1: palette.mediumDark,
    hintText_2: palette.blue,
    hintText_3: palette.blue,
    hintText_4: palette.pink,
    hintText_5: palette.orange,
    warningText: palette.red,
    supportText_1: palette.lightDark,
    supportText_2: palette.lightDark,
    supportText_3: palette.white,
    supportText_4: palette.blue,
    dateText_1: palette.dark,
    dateText_2: palette.dark,
    numberText_1: palette.blue,
    numberText_2: palette.white,
    numberText_3: palette.dark,
    numberText_4: palette.mediumGray,
    numberText_5: palette.dark,

    app_background: palette.white,
    // accordion
    accordion_icon: palette.dark,
    accordion_background: palette.white,
    accordion_underlay: Color(palette.white).alpha(0.8).string(),
    // action-sheet
    actionsheet_underlay: Color(palette.dark).alpha(0.4).string(),
    actionsheet_itemBg: palette.white,
    actionsheet_border: palette.lightGray,
    // avatar
    avatar_background: palette.white,
    // badge
    badge_text: palette.white,
    badge_background: palette.red,
    // button
    button_primary_underlay: Color(palette.blue).alpha(0.8).string(),
    button_secondary_underlay: palette.lightGray,
    button_other_underlay: palette.transparent,
    button_primary_background_disabled: Color(palette.blue).alpha(0.5).string(),
    button_primary_background: palette.blue,
    button_secondary_background_disabled: Color(palette.lightGray).alpha(0.2).string(),
    button_secondary_background: darkPalette.white,
    button_other_background: palette.white,
    button_primary_border: palette.transparent,
    button_other_border: palette.blue,
    button_secondary_loading: palette.blue,
    button_other_loading: palette.white,
    // button-group
    buttonGroup_active_background: palette.blue,
    buttonGroup_inactive_background: palette.white,
    buttonGroup_disabled_text: palette.mediumGray,
    buttonGroup_active_text: palette.white,
    buttonGroup_inactive_text: palette.blue,
    buttonGroup_border: palette.blue,
    // calendar
    calendar_background: palette.white,
    calendar_background_fill: palette.white,
    calendar_background_period: palette.cyan,
    calendar_background_selected: palette.blue,
    calendar_border: palette.lightGray,
    calendar_icon: palette.mediumGray,
    calendar_text: palette.mediumGray,
    calendar_text_selected: palette.blue,
    agenda_whitespace: palette.lightGray,
    agenda_icon: palette.mediumGray,
    // card
    card_background: palette.white,
    card_border: palette.lightGray,
    // checkable
    checkable_checked: palette.blue,
    checkable_unchecked: palette.mediumGray,
    checkable_disabled: palette.mediumGray,
    // count-down
    countdown_border: palette.blue,
    countdown_border_disabled: palette.lightGray,
    countdown_text: palette.blue,
    countdown_text_disabled: palette.lightGray,
    // date-picker
    datepicker_text: palette.mediumDark,
    datepicker_text_selected: palette.dark,
    datepicker_background: palette.white,
    datepicker_border_bottom: palette.lightGray,
    // divider
    divider_border: palette.lightGray,
    // empty
    empty_background: palette.white,
    // float-button
    floatbutton_default: palette.black,
    floatbutton_outrange: palette.black,
    floatbutton_icon: palette.blue,
    floatbutton_text: palette.dark,
    // flow
    flow_wait: palette.blue,
    flow_error: palette.red,
    flow_finish: palette.blue,
    flow_process: palette.blue,
    flow_border: palette.blue,
    flow_default: palette.blue,
    // icon
    icon_default: palette.dark,
    icon_background: palette.transparent,
    // image
    image_background: palette.cyan,
    image_border: palette.lightGray,
    // image-header
    imageheader_left: palette.blue,
    imageheader_background: palette.transparent,
    // image-picker
    imagepicker_border: palette.lightGray,
    imagepicker_icon: palette.mediumGray,
    // input
    input_required: palette.red,
    input_border: palette.lightGray,
    input_placeholder: palette.mediumDark,
    input_icon: palette.lightGray,
    // list-item
    listitem_background: palette.white,
    listitem_required: palette.red,
    listitem_icon: palette.lightGray,
    listitem_border: palette.lightGray,
    // menu
    menu_icon: palette.dark,
    menu_border: palette.lightGray,
    menu_group_background: palette.white,
    menu_active_background: palette.blue,
    menu_inactive_background: palette.cyan,
    menu_active_text: palette.white,
    menu_inactive_text: palette.dark,
    // modal
    modal_underlay: Color(palette.dark).alpha(0.4).string(),
    modal_background: palette.white,
    modal_border: palette.lightGray,
    modal_tip_background: palette.transparent,
    modal_tip_icon: palette.white,
    // notice-bar
    noticebar_icon: palette.orange,
    noticebar_background: palette.lightOrange,
    // number-keyboard
    number_keyboard_icon: palette.mediumDark,
    number_keyboard_border: palette.lightGray,
    number_keyboard_background: palette.white,
    number_keyboard_btn_background: palette.blue,
    // pagination
    pagination_default: palette.blue,
    pagination_text: palette.mediumDark,
    pagination_text_disabled: palette.mediumGray,
    // password
    password_border: palette.lightGray,
    password_icon: palette.mediumGray,
    password_dot: palette.dark,
    // picker
    picker_background: palette.white,
    picker_border_bottom: palette.lightGray,
    picker_text: palette.mediumDark,
    picker_text_selected: palette.dark,
    // progress
    progress_default: palette.blue,
    progress_background: palette.mediumGray,
    // rating
    rating_background: palette.white,
    rating_selected: palette.yellow,
    rating_unselected: palette.lightGray,
    /** 评分边线颜色 */
    rating_swipe_star_stroke: palette.yellow,
    /** 评分底色 */
    rating_swipe_background: palette.white,
    /** 评分填充色 */
    rating_swipe_fill_background: palette.yellow,
    // search-bar
    searchbar_background: palette.white,
    searchbar_inner_background: Color(palette.black).alpha(0.04).string(),
    searchbar_placeholder: palette.mediumDark,
    searchbar_icon: palette.mediumDark,
    searchbar_text: palette.dark,
    // share
    share_border: palette.lightGray,
    share_background: Color(palette.dark).alpha(0.08).string(),
    share_item: palette.mediumDark,
    share_item_background: palette.white,
    // slider
    slider_foreground: palette.blue,
    slider_background: palette.mediumGray,
    slider_border: palette.blue,
    slider_label: palette.dark,
    // stepper
    stepper_value: palette.dark,
    stepper_border: palette.lightGray,
    stepper_icon: palette.lightGray,
    // swiper
    swiper_dot: palette.white,
    // switch
    switch_inactive_background: palette.lightGray,
    switch_inactive_background_disabled: palette.mediumGray,
    switch_active_background: palette.blue,
    switch_active_background_disabled: Color(palette.blue).alpha(0.8).string(),
    switch_text: palette.blue,
    switch_inactive_disabled: Color(palette.white).alpha(0.8).string(),
    // table
    table_background: palette.white,
    table_border: palette.lightGray,
    // tabs
    tabs_background: palette.white,
    tabs_tint_active: palette.dark,
    tabs_tint_inactive: palette.mediumDark,
    tabs_background_indicator: palette.blue,
    tabs_border: palette.lightGray,
    // tag
    tag_background_primary: Color(palette.lightBlue).alpha(0.3).string(),
    tag_text_primary: palette.blue,
    tag_background_secondary: palette.mediumGray,
    tag_text_secondary: palette.mediumDark,
    tag_background_ghost: palette.white,
    tag_text_ghost: palette.lightBlue,
    tag_background_disabled: palette.lightGray,
    tag_background_check: palette.blue,
    tag_background_close: palette.mediumGray,
    tag_icon_close: palette.white,
    tag_text_disabled: palette.mediumGray,
    tag_border: palette.lightBlue,
    tag_border_disabled: Color(palette.lightBlue).alpha(0.5).string(),
    // timeline
    timeline_icon: palette.blue,
    timeline_line_background: palette.lightGray,
    // toast
    toast_success: palette.blue,
    toast_success_background: palette.cyan,
    toast_fail: palette.red,
    toast_fail_background: palette.lightRed,
    toast_mask: Color(palette.dark).alpha(0.4).string(),
  },
  textVariants: {
    /** 主标题-1  */
    title1: {
      fontSize: px(18),
      color: 'primaryText_1',
    },
    /** 主标题-2 */
    title2: {
      fontSize: px(18),
      color: 'primaryText_2',
    },
    /** 内容性文字-1 */
    content1: {
      fontSize: px(16),
      color: 'contentText_1',
    },
    /** 内容性文字-2 */
    content2: {
      fontSize: px(16),
      color: 'contentText_2',
    },
    /** 内容性文字-3 */
    content3: {
      fontSize: px(14),
      color: 'contentText_3',
    },
    /** 内容性文字-4 */
    content4: {
      fontSize: px(14),
      color: 'contentText_4',
    },
    /** 内容性文字-5 */
    content5: {
      fontSize: px(12),
      color: 'contentText_5',
    },
    /** 提示性文字-1 */
    hint1: {
      fontSize: px(16),
      color: 'hintText_1',
    },
    /** 提示性文字-2 */
    hint2: {
      fontSize: px(16),
      color: 'hintText_2',
    },
    /** 提示性文字-3 */
    hint3: {
      fontSize: px(14),
      color: 'hintText_3',
    },
    /** 提示性文字-4 */
    hint4: {
      fontSize: px(14),
      color: 'hintText_4',
    },
    /** 提示性文字-5 */
    hint5: {
      fontSize: px(14),
      color: 'hintText_5',
    },

    /** 警示性文字 */
    warn: {
      fontSize: px(16),
      color: 'warningText',
    },
    /** 辅助性文字-1 */
    support1: {
      fontSize: px(12),
      color: 'supportText_1',
    },
    /** 辅助性文字-2 */
    support2: {
      fontSize: px(10),
      color: 'supportText_2',
    },
    /** 辅助性文字-3 */
    support3: {
      fontSize: px(10),
      color: 'supportText_3',
    },
    /** 辅助性文字-4 */
    support4: {
      fontSize: px(10),
      color: 'supportText_4',
    },
    /** 日期-1 */
    date1: {
      fontSize: px(18),
      color: 'dateText_1',
    },
    /** 日期-2 */
    date2: {
      fontSize: px(14),
      color: 'dateText_2',
    },
    /** 数字-1 */
    number1: {
      fontSize: px(14),
      color: 'numberText_1',
    },
    /** 数字-2 */
    number2: {
      fontSize: px(8),
      color: 'numberText_1',
    },
    /** 数字-3 */
    number3: {
      fontSize: px(24),
      color: 'numberText_3',
    },
    /** 数字-4 */
    number4: {
      fontSize: px(14),
      color: 'numberText_4',
    },
    /** 数字-5 */
    number5: {
      fontSize: px(14),
      color: 'numberText_5',
    },
  },
  tagVariants: {
    /** 大标签 */
    large: {
      paddingHorizontal: 'xxl',
      justifyContent: 'center',
      alignItems: 'center',
      height: px(32),
    },
    /** 中标签, 默认标签 */
    middle: {
      paddingHorizontal: 'l',
      justifyContent: 'center',
      alignItems: 'center',
      height: px(24),
    },
    /** 小标签 */
    small: {
      paddingHorizontal: 'm',
      justifyContent: 'center',
      alignItems: 'center',
      height: px(20),
    },
  },
});
export type Theme = typeof theme;
export type Spacing = keyof Theme['spacing'];

export const darkTheme: Theme = {
  ...theme,
  colors: {
    /** 基础颜色 */
    transparent: 'transparent',
    success: darkPalette.green,
    warn: darkPalette.orange,
    fail: darkPalette.red,
    link: darkPalette.mediumBlue,
    white: darkPalette.white,
    black: darkPalette.black,
    primary: darkPalette.blue,
    secondary: darkPalette.lightBlue,
    border: darkPalette.lightWhite,
    primaryText_1: darkPalette.darkWhite,
    primaryText_2: darkPalette.white,
    contentText_1: darkPalette.darkWhite,
    contentText_2: darkPalette.white,
    contentText_3: darkPalette.darkWhite,
    contentText_4: darkPalette.mediumWhite,
    contentText_5: darkPalette.mediumWhite,
    hintText_1: darkPalette.mediumWhite,
    hintText_2: darkPalette.blue,
    hintText_3: darkPalette.blue,
    hintText_4: darkPalette.pink,
    hintText_5: darkPalette.orange,
    warningText: darkPalette.red,
    supportText_1: darkPalette.lightWhite,
    supportText_2: darkPalette.lightWhite,
    supportText_3: darkPalette.white,
    supportText_4: darkPalette.blue,
    dateText_1: darkPalette.darkWhite,
    dateText_2: darkPalette.darkWhite,
    numberText_1: darkPalette.blue,
    numberText_2: darkPalette.white,
    numberText_3: darkPalette.darkWhite,
    numberText_4: darkPalette.gray,
    numberText_5: darkPalette.darkWhite,

    app_background: darkPalette.dark,
    // accordion
    accordion_icon: darkPalette.darkWhite,
    accordion_background: darkPalette.darkBlue,
    accordion_underlay: darkPalette.darkWhite,
    // action-sheet
    actionsheet_underlay: Color(darkPalette.dark).alpha(0.4).string(),
    actionsheet_itemBg: darkPalette.darkBlue,
    actionsheet_border: darkPalette.lightWhite,
    // avatar
    avatar_background: darkPalette.darkBlue,
    // badge
    badge_text: darkPalette.white,
    badge_background: darkPalette.red,
    // button
    button_primary_underlay: Color(darkPalette.blue).alpha(0.8).string(),
    button_secondary_underlay: darkPalette.dark,
    button_other_underlay: darkPalette.transparent,
    button_primary_background_disabled: Color(darkPalette.blue).alpha(0.5).string(),
    button_primary_background: darkPalette.blue,
    button_secondary_background_disabled: Color(darkPalette.darkGray).alpha(0.2).string(),
    button_secondary_background: darkPalette.darkBlue,
    button_other_background: darkPalette.transparent,
    button_primary_border: darkPalette.transparent,
    button_other_border: darkPalette.darkGray,
    button_secondary_loading: darkPalette.blue,
    button_other_loading: darkPalette.white,
    // button-group
    buttonGroup_active_background: darkPalette.blue,
    buttonGroup_inactive_background: darkPalette.darkBlue,
    buttonGroup_disabled_text: darkPalette.mediumWhite,
    buttonGroup_active_text: darkPalette.white,
    buttonGroup_inactive_text: darkPalette.blue,
    buttonGroup_border: darkPalette.blue,
    // calendar
    calendar_background: darkPalette.darkBlue,
    calendar_background_fill: darkPalette.blue,
    calendar_background_period: darkPalette.alphaBlue,
    calendar_background_selected: darkPalette.blue,
    calendar_border: darkPalette.lightWhite,
    calendar_icon: darkPalette.mediumWhite,
    calendar_text: darkPalette.lightWhite,
    calendar_text_selected: darkPalette.darkWhite,
    agenda_whitespace: darkPalette.dark,
    agenda_icon: darkPalette.mediumWhite,
    // card
    card_background: darkPalette.darkBlue,
    card_border: darkPalette.lightWhite,
    // checkable
    checkable_checked: darkPalette.blue,
    checkable_unchecked: darkPalette.mediumWhite,
    checkable_disabled: darkPalette.mediumWhite,
    // count-down
    countdown_border: darkPalette.lightWhite,
    countdown_border_disabled: darkPalette.darkGray,
    countdown_text: darkPalette.blue,
    countdown_text_disabled: darkPalette.darkGray,
    // date-picker
    datepicker_text: darkPalette.mediumWhite,
    datepicker_text_selected: darkPalette.darkWhite,
    datepicker_background: darkPalette.darkBlue,
    datepicker_border_bottom: darkPalette.lightWhite,
    // divider
    divider_border: darkPalette.lightWhite,
    // empty
    empty_background: darkPalette.darkBlue,
    // float-button
    floatbutton_default: darkPalette.black,
    floatbutton_outrange: darkPalette.black,
    floatbutton_icon: darkPalette.white,
    floatbutton_text: darkPalette.darkWhite,
    // flow
    flow_wait: darkPalette.blue,
    flow_error: darkPalette.red,
    flow_finish: darkPalette.blue,
    flow_process: darkPalette.blue,
    flow_border: darkPalette.lightBlue,
    flow_default: darkPalette.blue,
    // icon
    icon_default: darkPalette.darkWhite,
    icon_background: darkPalette.transparent,
    // image
    image_background: darkPalette.darkBlue,
    image_border: darkPalette.lightWhite,
    // image-header
    imageheader_left: darkPalette.blue,
    imageheader_background: darkPalette.transparent,
    // image-picker
    imagepicker_border: darkPalette.lightWhite,
    imagepicker_icon: darkPalette.mediumWhite,
    // input
    input_required: darkPalette.red,
    input_border: darkPalette.lightWhite,
    input_placeholder: darkPalette.mediumWhite,
    input_icon: darkPalette.lightWhite,
    // list-item
    listitem_background: darkPalette.darkBlue,
    listitem_required: darkPalette.red,
    listitem_icon: darkPalette.lightWhite,
    listitem_border: darkPalette.lightWhite,
    // menu
    menu_icon: darkPalette.darkWhite,
    menu_border: darkPalette.lightWhite,
    menu_group_background: darkPalette.darkBlue,
    menu_active_background: darkPalette.dark,
    menu_inactive_background: darkPalette.darkBlue,
    menu_active_text: darkPalette.darkWhite,
    menu_inactive_text: darkPalette.darkWhite,
    // modal
    modal_underlay: Color(darkPalette.dark).alpha(0.4).string(),
    modal_background: darkPalette.darkBlue,
    modal_border: darkPalette.lightWhite,
    modal_tip_background: darkPalette.darkBlue,
    modal_tip_icon: darkPalette.darkBlue,
    // notice-bar
    noticebar_icon: darkPalette.orange,
    noticebar_background: darkPalette.lightOrange,
    // number-keyboard
    number_keyboard_icon: darkPalette.mediumWhite,
    number_keyboard_border: darkPalette.lightWhite,
    number_keyboard_background: darkPalette.darkBlue,
    number_keyboard_btn_background: darkPalette.blue,
    // pagination
    pagination_default: darkPalette.blue,
    pagination_text: darkPalette.mediumWhite,
    pagination_text_disabled: darkPalette.gray,
    // password
    password_border: darkPalette.lightWhite,
    password_icon: darkPalette.mediumWhite,
    password_dot: darkPalette.blue,
    // picker
    picker_text: darkPalette.mediumWhite,
    picker_text_selected: darkPalette.darkWhite,
    picker_background: darkPalette.darkBlue,
    picker_border_bottom: darkPalette.lightWhite,
    // progress
    progress_default: darkPalette.blue,
    progress_background: darkPalette.gray,
    // rating
    rating_background: darkPalette.darkBlue,
    rating_selected: darkPalette.yellow,
    rating_unselected: darkPalette.lightWhite,
    rating_swipe_background: darkPalette.darkBlue,
    rating_swipe_star_stroke: darkPalette.yellow,
    rating_swipe_fill_background: darkPalette.yellow,
    // search-bar
    searchbar_background: darkPalette.dark,
    searchbar_inner_background: darkPalette.darkBlue,
    searchbar_placeholder: darkPalette.lightWhite,
    searchbar_icon: darkPalette.lightWhite,
    searchbar_text: darkPalette.darkWhite,
    // share
    share_border: darkPalette.lightWhite,
    share_background: darkPalette.dark,
    share_item: darkPalette.mediumWhite,
    share_item_background: darkPalette.darkBlue,
    // slider
    slider_foreground: darkPalette.blue,
    slider_background: darkPalette.gray,
    slider_border: darkPalette.blue,
    slider_label: darkPalette.darkWhite,
    // stepper
    stepper_value: darkPalette.darkWhite,
    stepper_border: darkPalette.lightWhite,
    stepper_icon: darkPalette.lightWhite,
    // swiper
    swiper_dot: darkPalette.white,
    // switch
    switch_inactive_background: darkPalette.lightWhite,
    switch_inactive_background_disabled: darkPalette.mediumWhite,
    switch_active_background: darkPalette.blue,
    switch_active_background_disabled: Color(darkPalette.blue).alpha(0.8).string(),
    switch_text: darkPalette.blue,
    switch_inactive_disabled: Color(darkPalette.white).alpha(0.8).string(),
    // table
    table_background: darkPalette.darkBlue,
    table_border: darkPalette.lightWhite,
    // tabs
    tabs_background: darkPalette.darkBlue,
    tabs_tint_active: darkPalette.darkWhite,
    tabs_tint_inactive: darkPalette.mediumWhite,
    tabs_background_indicator: darkPalette.blue,
    tabs_border: darkPalette.lightWhite,
    // tag
    tag_background_primary: Color(darkPalette.lightBlue).alpha(0.3).string(),
    tag_text_primary: darkPalette.mediumBlue,
    tag_background_secondary: darkPalette.gray,
    tag_text_secondary: darkPalette.darkWhite,
    tag_background_ghost: darkPalette.darkBlue,
    tag_text_ghost: darkPalette.lightBlue,
    tag_background_disabled: darkPalette.darkGray,
    tag_text_disabled: darkPalette.mediumBlue,
    tag_background_check: darkPalette.lightBlue,
    tag_background_close: Color(darkPalette.grey).alpha(0.6).string(),
    tag_icon_close: darkPalette.white,
    tag_border: darkPalette.lightBlue,
    tag_border_disabled: Color(darkPalette.lightBlue).alpha(0.5).string(),
    // timeline
    timeline_icon: darkPalette.blue,
    timeline_line_background: darkPalette.darkGray,
    // toast
    toast_success: darkPalette.blue,
    toast_success_background: darkPalette.white,
    toast_fail: darkPalette.red,
    toast_fail_background: darkPalette.lightRed,
    toast_mask: Color(darkPalette.dark).alpha(0.4).string(),
  },
};

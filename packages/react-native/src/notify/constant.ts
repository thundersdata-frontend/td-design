import helpers from '../helpers';

const { px, deviceWidth } = helpers;

export const normalShadowOpt = {
  width: deviceWidth - px(32),
  height: px(40),
  radius: px(20),
  opacity: 0.16,
  border: 12,
};

export const SHORT = 3000;
export const LONG = 5000;

export enum NotifyType {
  INFO = 'info',
  SUCCESS = 'success',
  FAIL = 'fail',
}

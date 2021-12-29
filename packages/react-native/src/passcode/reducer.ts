import { fillOtpCode } from './helpers';

type SetOtpTextForIndexPayload = { index: number; text: string };
type SetOtpTextForIndex = {
  type: 'setOtpTextForIndex';
  payload: SetOtpTextForIndexPayload;
};

type SetOtpCodePayload = { count: number; code: string };
type SetOtpCode = {
  type: 'setOtpCode';
  payload: SetOtpCodePayload;
};

type ClearOtpPayload = number;
type ClearOtp = { type: 'clearOtp'; payload: ClearOtpPayload };

type SetHasKeySupportPayload = boolean;
type SetHasKeySupport = { type: 'setHasKeySupport'; payload: SetHasKeySupportPayload };

export type ReducerState = {
  otpCode: { [key: string]: string };
  handleChange?: (otpCode: string) => void;
  hasKeySupport: boolean;
};

export type ActionTypes = {
  setOtpTextForIndex: 'setOtpTextForIndex';
  setOtpCode: 'setOtpCode';
  clearOtp: 'clearOtp';
  setHasKeySupport: 'setHasKeySupport';
};

export type Actions = SetOtpTextForIndex | SetOtpCode | ClearOtp | SetHasKeySupport;

const ACTION_TYPES: ActionTypes = {
  setOtpTextForIndex: 'setOtpTextForIndex',
  setOtpCode: 'setOtpCode',
  clearOtp: 'clearOtp',
  setHasKeySupport: 'setHasKeySupport',
};

export default (state: ReducerState, { type, payload }: Actions) => {
  switch (type) {
    case ACTION_TYPES.setOtpTextForIndex: {
      const otpCode = {
        ...state.otpCode,
        [`${(payload as SetOtpTextForIndexPayload).index}`]: (payload as SetOtpTextForIndexPayload).text,
      };
      state.handleChange?.(Object.values(otpCode).join(''));

      return {
        ...state,
        otpCode,
      };
    }

    case ACTION_TYPES.setOtpCode: {
      const otpCode = fillOtpCode((payload as SetOtpCodePayload).count, (payload as SetOtpCodePayload).code);

      state.handleChange?.(Object.values(otpCode).join(''));

      return {
        ...state,
        otpCode,
      };
    }

    case ACTION_TYPES.clearOtp: {
      const otpCode = fillOtpCode(payload as ClearOtpPayload);
      state.handleChange?.(Object.values(otpCode).join(''));

      return { ...state, otpCode };
    }

    case ACTION_TYPES.setHasKeySupport: {
      return { ...state, hasKeySupport: payload as SetHasKeySupportPayload };
    }

    default:
      return state;
  }
};

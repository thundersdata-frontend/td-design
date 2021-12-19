import { fillOtpCode } from './helpers';

type SetOtpTextForIndex = {
  type: 'setOtpTextForIndex';
  payload: { index: number; text: string };
};
type SetOtpCode = {
  type: 'setOtpCode';
  payload: { count: number; code: string };
};
type ClearOtp = { type: 'clearOtp'; payload: number };
type SetHandleChange = { type: 'setHandleChange'; payload: any };
type SetHasKeySupport = { type: 'setHasKeySupport'; payload: boolean };

export type ReducerState = {
  otpCode: { [key: string]: string };
  handleChange?: (otpCode: string) => void;
  hasKeySupport: boolean;
};

export type ActionTypes = {
  setHandleChange: 'setHandleChange';
  setOtpTextForIndex: 'setOtpTextForIndex';
  setOtpCode: 'setOtpCode';
  clearOtp: 'clearOtp';
  setHasKeySupport: 'setHasKeySupport';
};

export type Actions = SetOtpTextForIndex | SetOtpCode | ClearOtp | SetHandleChange | SetHasKeySupport;

const ACTION_TYPES: ActionTypes = {
  setHandleChange: 'setHandleChange',
  setOtpTextForIndex: 'setOtpTextForIndex',
  setOtpCode: 'setOtpCode',
  clearOtp: 'clearOtp',
  setHasKeySupport: 'setHasKeySupport',
};

export default (state: ReducerState, { type, payload }: Actions) => {
  switch (type) {
    case ACTION_TYPES.setOtpTextForIndex: {
      console.log(state);
      const otpCode = {
        ...state.otpCode,
        [`${payload.index}`]: payload.text,
      };
      state.handleChange?.(Object.values(otpCode).join(''));

      return {
        ...state,
        otpCode,
      };
    }

    case ACTION_TYPES.setOtpCode: {
      const otpCode = fillOtpCode(payload.count, payload.code);

      state.handleChange?.(Object.values(otpCode).join(''));

      return {
        ...state,
        otpCode,
      };
    }

    case ACTION_TYPES.clearOtp: {
      const otpCode = fillOtpCode(payload);
      state.handleChange?.(Object.values(otpCode).join(''));

      return { ...state, otpCode };
    }

    case ACTION_TYPES.setHandleChange: {
      return { ...state, handleChange: payload };
    }

    case ACTION_TYPES.setHasKeySupport: {
      return { ...state, hasKeySupport: payload };
    }

    default:
      return state;
  }
};

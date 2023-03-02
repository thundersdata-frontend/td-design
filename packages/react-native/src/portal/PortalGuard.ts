import { DeviceEventEmitter, NativeEventEmitter } from 'react-native';

// 事件名
export const ADD_TYPE = 'TD_DESIGN_REACT_NATIVE_ADD_PORTAL';
export const REMOVE_TYPE = 'TD_DESIGN_REACT_NATIVE_REMOVE_PORTAL';

// 全局的监听事件
export const TopViewEventEmitter = DeviceEventEmitter || new NativeEventEmitter();

export class PortalGuard {
  private nextKey = 10000;

  add = (e: React.ReactNode) => {
    const key = this.nextKey++;
    // 发射监听事件
    TopViewEventEmitter.emit(ADD_TYPE, e, key);
    return key;
  };

  remove = (key: number) => TopViewEventEmitter.emit(REMOVE_TYPE, key);
}

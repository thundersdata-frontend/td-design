/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2019-09-29 15:18:10
 * @LastEditors: 陈杰
 * @LastEditTime: 2019-10-27 17:34:44
 */
import IceStore from '@ice/store';
import baseStore from './base';

const iceStore = new IceStore();
const store = {
  baseStore,
};
Object.keys(store).forEach(key => {
  iceStore.registerStore(key, store[key]);
});

export default iceStore;

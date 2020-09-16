/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 仇艳
 * @Date: 2020-09-16 14:40:43
 * @LastEditors: 仇艳
 * @LastEditTime: 2020-09-16 19:16:59
 */

const close = {
  position: 'absolute',
  backgroundColor: '#bbbbbb',
};

const closeIOS = {
  borderRadius: 8,
  width: 16,
  height: 16,
  left: -5,
  top: -4,
  overflow: 'hidden',
};

const closeAndroid = {
  width: 16,
  height: 16,
  borderRadius: 8,
  top: -2,
  paddingTop: 2,
  paddingLeft: 2,
  right: -4,
  overflow: 'hidden',
  transform: [
    {
      rotate: '45deg',
    },
  ],
};

const closeText = {
  color: '#ffffff',
  textAlign: 'center',
  fontSize: 20,
  lineHeight: 18,
};

const closeTransform = {
  transform: [
    {
      rotate: '-45deg',
    },
  ],
};

const text = {
  fontSize: 12,
  textAlign: 'center',
};

export default {
  close,
  closeIOS,
  closeAndroid,
  closeText,
  closeTransform,
  text,
};

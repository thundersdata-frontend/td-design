/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2019-11-18 20:00:24
 * @LastEditors: 陈杰
 * @LastEditTime: 2019-11-25 11:29:43
 */
import urlUtils from './index';
const { getFileType, isSupportPreview, isImg, isPdf, getUrlQuery, setUrlQuery } = urlUtils;

describe('测试stringUtils', () => {
  const { location } = window;

  beforeAll(() => {
    delete window.location;
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    window.location = {
      href: '',
      search: '',
      hash: '',
    };
  });

  afterAll(() => {
    window.location = location;
  });

  it('getFileType-1: 正常匹配文件后缀', () => {
    expect(getFileType('test.jpg')).toEqual('jpg');
  });

  it('getFileType-2: 文件后缀自动转小写', () => {
    expect(getFileType('test.JPG')).toEqual('jpg');
  });

  it('isSupportPreview-1: 判断jpg文件支持预览', () => {
    expect(isSupportPreview('test.jpg')).toEqual(true);
  });

  it('isSupportPreview-2: 判断exe文件不支持预览', () => {
    expect(isSupportPreview('test.exe')).toEqual(false);
  });

  it('isImg-1: 判断png文件是image类型', () => {
    expect(isImg('test.png')).toEqual(true);
  });

  it('isImg-2: 判断exe文件不是image类型', () => {
    expect(isImg('test.exe')).toEqual(false);
  });

  it('isPdf-1: 判断pdf文件是pdf类型', () => {
    expect(isPdf('test.pdf')).toEqual(true);
  });

  it('isPdf-2: 判断exe文件不是pdf类型', () => {
    expect(isPdf('test.exe')).toEqual(false);
  });

  it('getUrlQuery-1: 当前取不到参数是返回空对象', () => {
    expect(JSON.stringify(getUrlQuery())).toEqual('{}');
  });

  it('setUrlQuery-1: 可以设置key value到url', () => {
    const target = 'http://localhost/?id=53';
    window.location.href = target;
    expect(setUrlQuery({ id: 53 })).toEqual('http://localhost/?id=53');
  });

  it('setUrlQuery-2: 可以设置对象到url', () => {
    const target = 'http://localhost/?extra={"id":53}';
    window.location.href = target;
    expect(setUrlQuery({ extra: { id: 53 } })).toEqual('http://localhost/?extra={"id":53}');
  });

  it('setUrlQuery-3: 可以设置数组到url', () => {
    const target = 'http://localhost/?extra=[53]';
    window.location.href = target;
    expect(setUrlQuery({ extra: [53] })).toEqual('http://localhost/?extra=[53]');
  });
});

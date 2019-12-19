/*
 * @文件描述: 考虑到APP和PC共用，采用dayjs来实现date相关的工具函数封装
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2019-11-11 13:50:24
 * @LastEditors: 陈杰
 * @LastEditTime: 2019-11-11 14:58:49
 */
import dayjs from 'dayjs';

export default {
  /**
   * 格式化日期
   * @param date
   * @param format
   */
  formatDate(date: string | Date | number, format = 'YYYY-MM-DD') {
    return dayjs(date).format(format);
  },

  /**
   * 当前月是否是大月
   * @param {*} month
   */
  isBigMonth(month: number) {
    return [1, 3, 5, 7, 8, 10, 12].includes(month);
  },
};

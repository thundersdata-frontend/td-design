/*
 * @文件描述: 考虑到APP和PC共用，采用dayjs来实现date相关的工具函数封装
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2019-11-11 13:50:24
 * @LastEditors: 陈杰
 * @LastEditTime: 2019-11-11 14:46:01
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
  }
}

/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2019-10-23 20:40:36
 * @LastEditors: 陈杰
 * @LastEditTime: 2019-10-23 20:50:39
 */
'use strict';

import fs from 'fs';
import path from 'path';

export default function walk(current: string): string[] {
  if (!fs.lstatSync(current).isDirectory()) {
    return [current];
  }

  const files = fs.readdirSync(current).map(child => {
    child = path.join(current, child);
    return walk(child);
  });
  return [current].concat(...files);
}

/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2019-10-23 20:40:36
 * @LastEditors: 陈杰
 * @LastEditTime: 2019-10-23 20:45:44
 */
import fs from 'fs';

export default function delDir(path: string) {
  let files = [];
  if(fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file) => {
      let curPath = path + "/" + file;
      if(fs.statSync(curPath).isDirectory()){
        delDir(curPath); //递归删除文件夹
      } else {
        fs.unlinkSync(curPath); //删除文件
      }
    });
    fs.rmdirSync(path);
  }
}

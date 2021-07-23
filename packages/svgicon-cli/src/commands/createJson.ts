#!/usr/bin/env node

import path from 'path';
import fs from 'fs';
import colors from 'colors';

const targetFile = path.resolve('svgicon.json');

if (fs.existsSync(targetFile)) {
  console.error(colors.red('svgicon.json 文件已经存在'));
} else {
  fs.copyFileSync(path.join(__dirname, '../libs/svgicon.json'), targetFile);
  console.log(colors.green('svgicon.json 文件生成成功，建议你加入到版本控制中'));
}

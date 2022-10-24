import colors from 'colors';
import fs from 'fs';
import path from 'path';

import defaultConfig from './svgicon.json';

export interface Config {
  save_dir: string;
  trim_icon_prefix: string;
  default_icon_size: number;
  icon_svg: string;
  for_library: boolean;
}

let cacheConfig: Config;

export const getConfig = () => {
  if (cacheConfig) {
    return cacheConfig;
  }

  const targetFile = path.resolve('svgicon.json');

  if (!fs.existsSync(targetFile)) {
    console.warn(colors.red('svgicon.json 文件不存在，你是不是忘了创建它？'));
    process.exit(1);
  }

  const config = require(targetFile) as Config;

  config.save_dir = config.save_dir || defaultConfig.save_dir;
  config.default_icon_size = config.default_icon_size || defaultConfig.default_icon_size;
  config.for_library = config.for_library || defaultConfig.for_library;

  cacheConfig = config;

  return config;
};

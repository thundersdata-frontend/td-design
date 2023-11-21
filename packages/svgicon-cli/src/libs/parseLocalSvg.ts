import * as fs from 'fs';
import { globSync } from 'glob';
import path from 'path';

import { Config } from '../libs/getConfig';

export interface ILocalSvg {
  svgStr: string;
  name: string;
  styleType: boolean;
  hasFill: boolean;
}

const parseLocalSvg = ({ icon_svg }: Config) => {
  if (!icon_svg) {
    return [];
  }

  const localDir = path.resolve(icon_svg);

  const localSvg = globSync(path.join(localDir, '**/*.svg'));

  return localSvg.reduce<ILocalSvg[]>((previousValue, currentValue) => {
    let svgStr = fs.readFileSync(currentValue, 'utf-8');

    /**
     * 去除注释,title,desc等不需要的标签
     */
    svgStr = svgStr
      .substring(svgStr.indexOf('<svg '), svgStr.indexOf('</svg>') + 6)
      .replace(/<!-(.*?)->/g, '')
      .replace(/<title>(.*?)<\/title>/g, '')
      .replace(/<desc>(.*?)<\/desc>/g, '')
      .replace(/fill\=\"none\"/g, '');

    const styleType = !!~svgStr.indexOf('</style>') || !!~svgStr.indexOf('style=');

    // 判断svg里面有没有fill，如果没有，则后面不会引入getIconColor的helper
    const hasFill = svgStr.includes('fill=');

    previousValue.push({
      svgStr,
      name: path.basename(currentValue, '.svg'),
      styleType,
      hasFill,
    });

    return previousValue;
  }, []);
};

export default parseLocalSvg;

import colors from 'colors';
import fs from 'fs';
import glob from 'glob';
import { camelCase, upperFirst } from 'lodash';
import mkdirp from 'mkdirp';
import path from 'path';

import { ILocalSvg } from '../libs/parseLocalSvg';
import { copyTemplate } from './copyTemplate';
import { Config } from './getConfig';
import { getTemplate } from './getTemplate';
import {
  replaceCases,
  replaceComponentName,
  replaceComponentXml,
  replaceFillAttr,
  replaceFillStyle,
  replaceHelper,
  replaceImports,
  replaceNames,
  replacePx,
  replaceSingleIconContent,
  replaceSize,
  replaceSvgComponents,
} from './replace';
import { whitespace } from './whitespace';

export const generateComponent = (localSvg: ILocalSvg[], config: Config) => {
  const svgComponents: Set<string> = new Set();
  const names: string[] = [];
  const imports: string[] = [];
  const saveDir = path.resolve(config.save_dir);
  const jsxExtension = '.tsx';
  const jsExtension = '.ts';
  let cases = '';

  mkdirp.sync(saveDir);
  glob.sync(path.join(saveDir, '*')).forEach(file => fs.unlinkSync(file));
  svgComponents.add('GProps');

  copyTemplate(`helper${jsExtension}`, path.join(saveDir, `helper${jsExtension}`));

  /**
   * 本地文件添加
   */
  localSvg.forEach(({ name, svgStr, styleType, hasFill }) => {
    let singleFile: string;

    const componentName = upperFirst(config.trim_icon_prefix) + upperFirst(camelCase(name));
    const currentSvgComponents = new Set<string>();
    currentSvgComponents.add('GProps');
    currentSvgComponents.add(styleType ? 'SvgCss' : 'SvgXml');

    names.push(name);

    cases += `${whitespace(4)}case '${name}':\n`;

    imports.push(componentName);

    cases += `${whitespace(6)}return <${componentName} {...rest} />;\n`;

    singleFile = getTemplate('LocalSingleIcon' + jsxExtension);
    singleFile = replacePx(singleFile, config.for_library);
    singleFile = replaceSize(singleFile, config.default_icon_size);
    singleFile = replaceSvgComponents(singleFile, currentSvgComponents);
    singleFile = replaceComponentName(singleFile, componentName);

    let xmlStr = replaceFillAttr(svgStr);
    if (styleType) {
      xmlStr = replaceFillStyle(xmlStr);
    }
    singleFile = replaceComponentXml(singleFile, `const xml = \`\n${xmlStr}\n\``);
    singleFile = replaceSingleIconContent(
      singleFile,
      `\n${whitespace(4)}<${styleType ? 'SvgCss' : 'SvgXml'} xml={xml}  width={width} height={height} {...rest} />\n`
    );
    singleFile = replaceHelper(singleFile, hasFill);

    fs.writeFileSync(path.join(saveDir, componentName + jsxExtension), singleFile);
    console.log(`${colors.green('√')} Generated local icon "${colors.yellow(name)}"`);
  });

  /**
   * 生成SvgIcon入口文件
   */
  let iconFile = getTemplate('Icon' + jsxExtension);
  iconFile = replaceSize(iconFile, config.default_icon_size);
  iconFile = replaceCases(iconFile, cases);
  iconFile = replaceSvgComponents(iconFile, svgComponents);
  iconFile = replaceImports(iconFile, imports);
  iconFile = replaceNames(iconFile, names);

  fs.writeFileSync(path.join(saveDir, 'index' + jsxExtension), iconFile);

  console.log(`\n${colors.green('√')} All icons have putted into dir: ${colors.green(config.save_dir)}\n`);
};

import fs from 'fs';
import path from 'path';
import download from 'download-git-repo';
import chalk from 'chalk';
import ora from 'ora';

import replaceProject from './utils/replaceProject';
import walk from './utils/walk';
import translateFilePath from './utils/translateFilePath';
import deleteOldDirs from './utils/deleteOldDirs';

export default {
  init(projectName: string, branch: string) {
    const repository = `thundersdata-frontend/rn-template#${branch}`;
    console.log(chalk.green(`模板地址：${repository}`));
    const spinner = ora('正在下载模板，请稍候...');
    spinner.start();
    download(repository, projectName, { clone: true }, (err: string) => {
      if (err) {
        spinner.fail();
        console.log(chalk.red(err));
      } else {
        spinner.succeed();

        const rootPath = path.resolve(projectName);
        // 替换和生成所有重命名之后的文件和文件夹
        walk(rootPath).forEach(absoluteFilePath => {
          const relativeFilePath = path.relative(rootPath, absoluteFilePath);
          const relativeRenamedPath = translateFilePath(relativeFilePath)
            .replace(/rnTemplate/g, projectName)
            .replace(/rntemplate/g, projectName.toLowerCase());

          replaceProject(absoluteFilePath, path.resolve(rootPath, relativeRenamedPath), {
            'Hello App Display Name': projectName,
            rnTemplate: projectName,
            rntemplate: projectName.toLowerCase(),
          });
        });
        // 删除以前的旧的文件夹和文件夹下的内容
        walk(rootPath).forEach(absoluteFilePath => {
          if (fs.existsSync(absoluteFilePath) && fs.statSync(absoluteFilePath).isDirectory()) {
            if (absoluteFilePath.includes('rnTemplate') || absoluteFilePath.includes('rntemplate')) {
              deleteOldDirs(absoluteFilePath);
            }
          }
        });
        console.log(chalk.green('项目初始化完成'));
      }
    });
  },
};

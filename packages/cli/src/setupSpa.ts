/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2019-10-23 20:54:44
 * @LastEditors: 陈杰
 * @LastEditTime: 2019-10-23 21:00:53
 */
import fs from 'fs';
import download from 'download-git-repo';
import symbols from 'log-symbols';
import handlebars from 'handlebars';
import chalk from 'chalk';
import ora from 'ora';

export default {
  init: function (answers: {
    description?: string;
    author?: string;
    version?: string;
  }, name: string) {

    const spinner = ora('正在下载模板，请稍候...');
    spinner.start();
    const repository = 'thundersdata-frontend/spa-template';
    download(repository, name, {clone: true}, (err: string) => {
      if (err) {
        spinner.fail();
        console.log(symbols.error, chalk.red(err));
      } else {
        spinner.succeed();
        const fileName = `${name}/package.json`;
        const meta = {
          name,
          description: answers.description,
          author: answers.author,
          version: answers.version,
        };
        if(fs.existsSync(fileName)){
          const content = fs.readFileSync(fileName).toString();
          const result = handlebars.compile(content)(meta);
          fs.writeFileSync(fileName, result);
        }
        console.log(symbols.success, chalk.green('项目初始化完成'));
      }
    });
  }
}

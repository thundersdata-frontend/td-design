import chalk from 'chalk';
import download from 'download-git-repo';
import ora from 'ora';

export default {
  init: function (name: string, branch: string) {
    const repository = `thundersdata-frontend/spa-template#${branch}`;
    console.log(chalk.green(`模板地址：${repository}`));
    const spinner = ora('正在下载模板，请稍候...');
    spinner.start();
    download(repository, name, { clone: true }, (err: string) => {
      if (err) {
        spinner.fail();
        console.log(chalk.red(err));
      } else {
        spinner.succeed();
        console.log(chalk.green('项目初始化完成'));
      }
    });
  },
};

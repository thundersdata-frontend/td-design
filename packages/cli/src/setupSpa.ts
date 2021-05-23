import fs from 'fs';
import download from 'download-git-repo';
import handlebars from 'handlebars';
import chalk from 'chalk';
import ora from 'ora';

export default {
  init: function (
    answers: {
      description?: string;
      author?: string;
      version?: string;
      branch?: string;
    },
    name: string
  ) {
    const repository = `thundersdata-frontend/spa-template#${answers.branch}`;
    console.log(chalk.green(`模板地址：${repository}`));
    const spinner = ora('正在下载模板，请稍候...');
    spinner.start();
    download(repository, name, { clone: true }, (err: string) => {
      if (err) {
        spinner.fail();
        console.log(chalk.red(err));
      } else {
        spinner.succeed();
        const fileName = `${name}/package.json`;
        const meta = {
          name,
          description: answers.description,
          author: answers.author,
          version: answers.version,
        };
        if (fs.existsSync(fileName)) {
          const content = fs.readFileSync(fileName).toString();
          const result = handlebars.compile(content)(meta);
          fs.writeFileSync(fileName, result);
        }
        console.log(chalk.green('项目初始化完成'));
      }
    });
  },
};

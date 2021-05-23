import fs from 'fs';
import program from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';

import setupSpa from './setupSpa';
import setupApp from './setupApp';

program
  .version('1.0.0', '-v, --version')
  .command('init <name>')
  .action(name => {
    if (!fs.existsSync(name)) {
      validateProjectName(name);
      inquirer
        .prompt([
          {
            name: 'platform',
            message: '请选择项目类型',
            type: 'list',
            choices: ['spa', 'app'],
          },
          {
            name: 'branch',
            message: '请选择项目分支',
            type: 'input',
            default: 'master',
          },
        ])
        .then((answers: { platform: string; description?: string; author?: string; version?: string }) => {
          if (answers.platform === 'spa') {
            setupSpa.init(answers, name);
          } else if (answers.platform === 'app') {
            setupApp.init(answers, name);
          }
        });
    } else {
      console.log(chalk.red('项目已存在'));
    }
  });
program.parse(process.argv);

/**
 * 对项目名进行校验
 * @param {*} name
 */
function validateProjectName(name: string) {
  if (!String(name).match(/^[$A-Z_][0-9A-Z_$]*$/i)) {
    console.error(
      '"%s" is not a valid name for a project. Please use a valid identifier ' + 'name (alphanumeric).',
      name
    );
    process.exit(1);
  }

  if (name === 'React') {
    console.error('"%s" is not a valid name for a project. Please do not use the ' + 'reserved word "React".', name);
    process.exit(1);
  }
}

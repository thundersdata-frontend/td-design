const minimist = require('minimist');
const { execSync } = require('child_process');

const rawArgs = process.argv ? process.argv.slice(2) : [];
const args = minimist(rawArgs);
let rootDir = './';
if (args.p) {
  rootDir = rootDir + 'packages/' + args.p;
  execSync(`tsc -p ${rootDir}/tsconfig.json`);
} else {
  console.log('请指定要检查的模块');
}

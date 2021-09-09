module.exports = {
  '**/*.ts?(x)': () => ['npm run tsc'],
  '**/*.ts?(x)': filenames => ['npm run eslint', 'npm run prettier', 'git add .'],
};

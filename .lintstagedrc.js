module.exports = {
  '**/*.ts?(x)': () => ['npm run tsc', 'npm run eslint', 'npm run prettier'],
};

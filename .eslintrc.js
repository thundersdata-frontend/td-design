module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  rules: {
    // your rules
    'global-require': 0,
    'no-shadow': 0,
    'operator-assignment': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-param-reassign': 0,
    'react/no-array-index-key': 0,
    '@typescript-eslint/no-use-before-define': 0,
    'no-use-before-define': 0,
    'no-console': 0,
    'react/no-did-update-set-state': 0,
    'no-underscore-dangle': 0,
    'react/sort-comp': 0,
    'lines-between-class-members': 0,
  },
};

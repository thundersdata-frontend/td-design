module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-hooks'],
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:react/recommended',
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    'prettier/react',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    jsx: true,
    useJSXTextNode: true,
  },
  rules: {
    // your rules
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'global-require': 0,
    'no-shadow': 0,
    'operator-assignment': 0,
    'no-param-reassign': 0,
    'react/no-array-index-key': 0,
    'react/prop-types': 0,
    'react/no-did-update-set-state': 0,
    'react/sort-comp': 0,
    'react/display-name': 0,
    '@typescript-eslint/no-use-before-define': 0,
    'no-use-before-define': 0,
    'no-console': 0,
    'no-underscore-dangle': 0,
    'lines-between-class-members': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/ban-ts-comment': 1,
  },
};

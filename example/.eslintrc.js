module.exports =  {
  parser:  '@typescript-eslint/parser',
  extends:  [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  plugins: ['react-hooks'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  parserOptions:  {
    ecmaVersion:  2018,
    sourceType:  'module',
    jsx: true,
    useJSXTextNode: true,
  },
  rules: {
    'complexity': ['warn', { max: 4 }],
    "no-unused-vars": "off",
    "no-useless-constructor": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-empty-function": "warn",
    "@typescript-eslint/camelcase": "off",
    "react/prop-types": "off",
    "react/display-name": "off",
    "react/no-deprecated": "warn",
    "react/prop-types": [2, { ignore: ['children'] }],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  }
};

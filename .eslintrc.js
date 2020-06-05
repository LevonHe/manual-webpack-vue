module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  globals: {
    AMap: true,
  },
  extends: ['airbnb-base', 'plugin:vue/essential', '@vue/standard', '@vue/prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: ['error', 'always'],
    'comma-dangle': ['off'],
    'space-before-function-paren': ['off'],
    indent: ['off'],
    'node/no-deprecated-api': ['off'],
    'import/no-unresolved': ['off'],
    'no-param-reassign': ['off'],
    'no-underscore-dangle': ['off'],
    'import/prefer-default-export': ['off'],
    'no-plusplus': ['off'],
    'no-shadow': ['off'],
    'consistent-return': ['off'],
    'no-restricted-properties': ['off'],
    'prefer-spread': ['off'],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};

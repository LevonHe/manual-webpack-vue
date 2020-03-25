module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  globals: {
    AMap: true,
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: ['error', 'always'],
    'comma-dangle': ['off'],
    'space-before-function-paren': ['off'],
    indent: ['off'],
    'node/no-deprecated-api': ['off'],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};

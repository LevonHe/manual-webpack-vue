module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:vue/essential', '@vue/standard', '@vue/prettier'],
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': ['off', { vars: 'all', args: 'none' }],
    semi: ['error', 'always'],
    'comma-dangle': ['off'],
    'space-before-function-paren': ['off'],
    indent: ['off'],
    'node/no-deprecated-api': ['off'],
  },
};

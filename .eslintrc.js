module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'no-param-reassign': ['off'],
    'consistent-return': ['off'],
    'max-len': ['off'],
    'no-await-in-loop': ['off'],
  },
};

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/recommended', '@vue/airbnb'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  ignorePatterns: ['node_modules'],
  rules: {
    'max-len': 'off',
    'no-param-reassign': ['error', { props: false }],
  },
};

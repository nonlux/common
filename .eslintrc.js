module.exports = {
  parser: 'babel-eslint',
  extends: 'eslint-config-airbnb',
  env: {
    browser: true,
    node: true,
    mocha: true,
  },
  rules: {
    'import/extensions': 0,
    'react/jsx-filename-extension': 0,
    'react/prefer-stateless-function': 0,
  },
  plugins: ['react', 'import', 'flowtype-errors'],
  settings: {
    'import/parser': 'babel-eslint',
    'import/resolve': {
      moduleDirectory: ['node_modules', 'src'],
    },
  },
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
};

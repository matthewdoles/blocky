module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      isFilled: false
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    isFilled: false
  },
  plugins: ['react'],
  rules: {}
};

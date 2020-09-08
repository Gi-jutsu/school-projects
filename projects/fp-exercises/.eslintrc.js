module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    es6: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 2,
  }
}
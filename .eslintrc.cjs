module.exports = {
  root: true,
  env: { browser: false, es2020: true },
  extends: ['eslint:recommended'],
  ignorePatterns: ['.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    semi: ['error', 'always', { omitLastInOneLineBlock: false }],
    'comma-dangle': ['error', 'never'],
    quotes: ['error', 'single'],
    indent: ['error', 2],
  },
};

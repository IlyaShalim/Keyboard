module.exports = {
  root: true,
  extends: ['airbnb-base', 'prettier', 'plugin:node/recommended'],
  plugins: ['prettier'],
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        trailingComma: 'all',
        singleQuote: true,
        printWidth: 100,
        jsxBracketSameLine: true,
        semi: true,
      },
    ],
    'node/no-unsupported-features/es-syntax': 'off',
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'no-plusplus': 'off',
    'func-names': 'off',
    'no-alert': 'off',
    'import/prefer-default-export': 'off',
    'prefer-template': 'off',
    'import/extensions': 'off',
    'import/no-dynamic-require': 'off',
    'global-require': 'off',
    'no-constant-condition': 'off',
    'no-restricted-globals': 'off',
    'no-underscore-dangle': 'off',
    'no-return-assign': 'off',
    allowForLoopAfterthoughts: 'off',
    'no-param-reassign': 'off',
  },
};

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module', ecmaFeatures: { jsx: true } },
  env: { browser: true, es2022: true, node: true },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'react-refresh'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  settings: { react: { version: 'detect' } },
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 1 }],
    'padded-blocks': ['error', 'never'],
    'no-trailing-spaces': 'error',

    // Отступы = 2 пробела, без табов
    'indent': ['error', 2, { SwitchCase: 1 }],
    'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
    'no-tabs': ['error', { allowIndentationTabs: false }],

    // JSX отступы
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],

  },
  ignorePatterns: ['dist/', 'build/', 'coverage/', 'vite-env.d.ts', 'sw.js', 'sw.*.js']
}

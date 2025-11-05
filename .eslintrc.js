module.exports = {
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'standard-with-typescript',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: ['react', 'only-warn', 'prettier', 'simple-import-sort'],
  rules: {
    'import/order': 'off',
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          // react
          ['^react', '^@?\\w'],
          // absolute paths.
          [
            '^(app|proccess|pages|widgets|features|entities|shared)(/.*|$)',
          ],
          // relative imports
          [
            '^\\./(?=.*/)(?!/?$)',
            '^\\.(?!/?$)',
            '^\\./?$',
            '^\\.\\.(?!/?$)',
            '^\\.\\./?$',
          ],
          // not matched
          ['^'],
          // types
          ['^.+\\.?(types)$'],
          // Style imports.
          ['.module.scss', '.styled', '^.+\\.?(css)$'],
        ],
      },
    ],
    'import/no-unresolved': 'off',
    semi: ['error', 'always'],
    '@typescript-eslint/semi': 'off',
    'max-len': ['error', { code: 120 }],
    indent: 'off',
    '@typescript-eslint/indent': 'off',
    'react/jsx-indent': ['error', 4],
    'react/prop-types': 'off',
    '@typescript-eslint/no-dynamic-delete': 'off',
    'react/jsx-indent-props': ['error', 4],
    'react/display-name': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/self-closing-comp': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/array-type': 'off',
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'info'],
      },
    ],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        tabWidth: 4,
        endOfLine: 'auto',
        trailingComma: 'es5',
      },
    ],
    '@typescript-eslint/consistent-type-imports': 'error',
    'react/jsx-curly-brace-presence': [
      'error',
      { props: 'never', children: 'never' },
    ],
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    curly: ['error', 'all'],
    '@typescript-eslint/no-floating-promises': 'off',
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/recommended'],
      parser: '@typescript-eslint/parser',
      rules: {
        'react/prop-types': 'off',
        'no-empty-function': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-misused-promises': [
          'error',
          { checksVoidReturn: false },
        ],
      },
    },
    {
      files: ['*'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'import/extensions': 'off',
        'react/jsx-filename-extension': [
          1,
          { extensions: ['.js', '.jsx', '.tsx'] },
        ],
      },
    },
  ],
};

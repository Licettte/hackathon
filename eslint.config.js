import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    { ignores: ['dist', 'build', 'coverage', '**/*.css', '**/*.scss'] },

    {
        name: 'base',
        files: ['**/*.{js,jsx,ts,tsx}'],
        extends: [js.configs.recommended],
        languageOptions: {
            ecmaVersion: 2023,
            sourceType: 'module',
            // ⬇️ перенесено сюда:
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
            globals: globals.browser,
        },
        plugins: {
            react: reactPlugin,
            'react-hooks': reactHooks,
            'simple-import-sort': simpleImportSort,
        },
        settings: { react: { version: 'detect' } },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'simple-import-sort/imports': ['warn', {
                groups: [
                    ['^react', '^@?\\w'],
                    ['^(app|proccess|pages|widgets|features|entities|shared)(/.*|$)'],
                    ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$', '^\\.\\.(?!/?$)', '^\\.\\./?$'],
                    ['^'],
                    ['^.+\\.?(types)$'],
                    ['.module.scss', '.styled', '^.+\\.?(css)$'],
                ],
            }],
            'max-len': ['error', { code: 120 }],
            semi: ['error', 'always'],
            indent: 'off',
            'arrow-body-style': 'off',
            'prefer-arrow-callback': 'off',
            curly: ['error', 'all'],
            'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react/display-name': 'off',
            'react/self-closing-comp': 'off',
            'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
            'react/jsx-indent': ['error', 4],
            'react/jsx-indent-props': ['error', 4],
            'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx'] }],
            'react-hooks/exhaustive-deps': 'off',
        },
    },

    {
        name: 'ts (unstyled)',
        files: ['**/*.{ts,tsx}'],
        extends: [...tseslint.configs.recommended],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/no-unused-expressions': 'off',
            'no-empty-function': 'off',
        },
    },

    {
        name: 'ts type-checked',
        files: ['**/*.{ts,tsx}'],
        extends: [...tseslint.configs.recommendedTypeChecked],
        languageOptions: {
            parserOptions: {
                projectService: true,
            },
        },
        rules: {
            '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/consistent-type-definitions': 'off',
            '@typescript-eslint/array-type': 'off',
            '@typescript-eslint/strict-boolean-expressions': 'off',
            '@typescript-eslint/prefer-nullish-coalescing': 'off',
            '@typescript-eslint/no-floating-promises': 'off',
        },
    },

    {
        name: 'prettier',
        files: ['**/*.{js,jsx,ts,tsx}'],
        extends: [eslintConfigPrettier],
    },
);

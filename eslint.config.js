import js from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    { ignores: ['build'] },
    {
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended,
            eslintPluginPrettierRecommended,
        ],
        files: ['**/*.{ts,tsx,js,jsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'simple-import-sort': simpleImportSort,
            react,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
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
            semi: ['error', 'always'],
            'max-len': ['error', { code: 120 }],
            indent: 'off',
            'arrow-body-style': 'off',
            'prefer-arrow-callback': 'off',
            'no-console': [
                'error',
                {
                    allow: ['warn', 'error', 'info'],
                },
            ],
            curly: ['error', 'all'],
            'no-empty-function': 'off',
            'react/jsx-indent': ['error', 4],
            'react/prop-types': 'off',
            'react/jsx-indent-props': ['error', 4],
            'react/display-name': 'off',
            'react/self-closing-comp': 'off',
            'react/jsx-curly-brace-presence': [
                'error',
                { props: 'never', children: 'never' },
            ],
            'react/react-in-jsx-scope': 'off',
            'react-hooks/exhaustive-deps': 'off',
            'react/jsx-filename-extension': [
                1,
                { extensions: ['.js', '.jsx', '.tsx'] },
            ],
            '@typescript-eslint/no-unused-expressions': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
        },
    }
);

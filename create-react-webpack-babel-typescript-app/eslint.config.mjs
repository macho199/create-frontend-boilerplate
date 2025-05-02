import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import importPlugin from 'eslint-plugin-import';
import css from '@eslint/css';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReactHooks.configs['recommended-latest'],
  jsxA11y.flatConfigs.recommended,
  importPlugin.flatConfigs.recommended,
  {
    files: ['**/*.css'],
    plugins: { css },
    language: 'css/css',
    extends: ['css/recommended'],
  },
  {
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    plugins: {
      'no-relative-import-paths': noRelativeImportPaths,
      'react-refresh': reactRefresh,
    },
    rules: {
      'react-refresh/only-export-components': 'error',
      'no-relative-import-paths/no-relative-import-paths': [
        'warn',
        {
          allowSameFolder: true, // 같은 폴더 내에서 상대 경로 사용 허용
          rootDir: 'src',
          prefix: '@',
        },
      ],
    },
  },
]);

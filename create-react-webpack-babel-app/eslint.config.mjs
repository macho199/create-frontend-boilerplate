import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import importPlugin from 'eslint-plugin-import';
import css from '@eslint/css';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  pluginReact.configs.flat.recommended,
  pluginReactHooks.configs['recommended-latest'],
  jsxA11y.flatConfigs.recommended,
  importPlugin.flatConfigs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: { js },
    languageOptions: { globals: globals.browser },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.css'],
    plugins: { css },
    language: 'css/css',
    extends: ['css/recommended'],
  },
  {
    settings: {
      'import/resolver': {
        alias: {
          map: [['@', './src']],
          extensions: ['.js', '.jsx'],
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

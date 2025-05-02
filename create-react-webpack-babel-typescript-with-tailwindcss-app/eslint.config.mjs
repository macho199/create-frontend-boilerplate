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
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    ...pluginReact.configs.flat.recommended,
  },
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
      // 현재 React 버전을 명시합니다.
      // 명시하지 않을 경우(기본값 'detect') React 라이브러리 전체를 불러오므로
      // 린트 과정에서 속도가 느려질 수 있습니다.
      react: {
        version: '18.2',
      },
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
      // 파일에서 react 컴포넌트만을 export하도록 제한함으로써, Fast Refresh가 올바르게 작동할 수 있도록 도움.
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'no-relative-import-paths/no-relative-import-paths': [
        'warn',
        {
          allowSameFolder: true, // 같은 폴더 내에서 상대 경로 사용 허용
          rootDir: 'src',
          prefix: '@',
        },
      ],
      // <img> 엘리먼트에 유의미한 대체 텍스트가 있는지 체크
      'jsx-a11y/alt-text': [
        'warn',
        {
          elements: ['img'],
        },
      ],
      // 유효한 aria-* 속성만 사용
      'jsx-a11y/aria-props': 'warn',
      // 유효한 aria-* 상태/값만 사용
      'jsx-a11y/aria-proptypes': 'warn',
      // DOM에서 지원되는 role, ARIA만 사용
      'jsx-a11y/aria-unsupported-elements': 'warn',
      // 필수 ARIA 속성이 빠져있는지 체크
      'jsx-a11y/role-has-required-aria-props': 'warn',
      // ARIA 속성은 지원되는 role에서만 사용
      'jsx-a11y/role-supports-aria-props': 'warn',
      // DOM에 정의되지 않은 속성을 사용했는지 체크 (Emotion css 속성 등 예외 케이스가 있으므로 기본은 off)
      'react/no-unknown-property': 'off',
    },
  },
]);
